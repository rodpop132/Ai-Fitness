const DEFAULT_API_BASE = "http://23.136.44.213:30087";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim() || DEFAULT_API_BASE;

export interface ApiError extends Error {
  status?: number;
  payload?: unknown;
}

const buildHeaders = (token?: string, extra?: Record<string, string>) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(extra || {}),
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async <T>(response: Response): Promise<T> => {
  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");

  if (!response.ok) {
    const error: ApiError = new Error(`Request failed with status ${response.status}`);
    error.status = response.status;
    error.payload = isJson ? await response.json().catch(() => undefined) : undefined;
    throw error;
  }

  if (response.status === 204) {
    return {} as T;
  }

  return (isJson ? await response.json() : await response.text()) as T;
};

export const api = {
  baseUrl: API_BASE_URL,

  async signup(email: string, password: string) {
    return handleResponse<{ token: string }>(
      await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: buildHeaders(),
        body: JSON.stringify({ email, password }),
      }),
    );
  },

  async login(email: string, password: string) {
    return handleResponse<{ token: string }>(
      await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: buildHeaders(),
        body: JSON.stringify({ email, password }),
      }),
    );
  },

  async logout(token: string) {
    return handleResponse<{ ok: boolean }>(
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: buildHeaders(token),
      }),
    );
  },

  async session(token: string) {
    const url = new URL(`${API_BASE_URL}/auth/session`);
    url.searchParams.set("token", token);
    return handleResponse<{
      user_id: string;
      email: string;
      name?: string;
      plan: string;
      daily_messages_used: number;
      daily_images_used: number;
    }>(await fetch(url, { headers: buildHeaders() }));
  },

  async listConversations(token: string, page = 1, pageSize = 20) {
    const url = new URL(`${API_BASE_URL}/chat/conversations`);
    url.searchParams.set("page", String(page));
    url.searchParams.set("page_size", String(pageSize));
    return handleResponse<{
      items: Array<{ id: string; title: string; created_at: string; updated_at?: string }>;
      page: number;
      page_size: number;
    }>(
      await fetch(url, {
        headers: buildHeaders(token),
      }),
    );
  },

  async createConversation(token: string, title: string) {
    return handleResponse<{ id: string; title: string }>(
      await fetch(`${API_BASE_URL}/chat/conversations`, {
        method: "POST",
        headers: buildHeaders(token),
        body: JSON.stringify({ title }),
      }),
    );
  },

  async deleteConversation(token: string, conversationId: string) {
    return handleResponse<{ ok: boolean }>(
      await fetch(`${API_BASE_URL}/chat/conversations/${conversationId}`, {
        method: "DELETE",
        headers: buildHeaders(token),
      }),
    );
  },

  async fetchConversationMessages(token: string, conversationId: string) {
    return handleResponse<any>(
      await fetch(`${API_BASE_URL}/chat/conversations/${conversationId}`, {
        headers: buildHeaders(token),
      }),
    );
  },

  async generateUploadUrl(token: string, filename: string, contentType: string) {
    return handleResponse<{
      provider: string;
      upload_url: string;
      headers: Record<string, string>;
      expires_in: number;
    }>(
      await fetch(`${API_BASE_URL}/media/upload-url`, {
        method: "POST",
        headers: buildHeaders(token),
        body: JSON.stringify({ filename, content_type: contentType }),
      }),
    );
  },

  async listProgress(token: string) {
    return handleResponse<{ items: Array<{ date: string; weight_kg?: number; body_fat_pct?: number; notes?: string }> }>(
      await fetch(`${API_BASE_URL}/progress`, {
        headers: buildHeaders(token),
      }),
    );
  },

  async addProgress(token: string, entry: { weight_kg?: number; body_fat_pct?: number; notes?: string }) {
    return handleResponse<{ ok: boolean }>(
      await fetch(`${API_BASE_URL}/progress`, {
        method: "POST",
        headers: buildHeaders(token),
        body: JSON.stringify(entry),
      }),
    );
  },

  async listAdminUsers(token: string, page = 1, pageSize = 50) {
    const url = new URL(`${API_BASE_URL}/admin/users`);
    url.searchParams.set("page", String(page));
    url.searchParams.set("page_size", String(pageSize));
    return handleResponse<{
      items: Array<{
        id: string;
        email: string;
        plan: string;
        created_at: string;
      }>;
      page: number;
      page_size: number;
    }>(
      await fetch(url, {
        headers: buildHeaders(token),
      }),
    );
  },
};

export type StreamingChunk =
  | { type: "start"; message_id: string }
  | { type: "data"; content: string }
  | { type: "end"; assistant_message_id: string }
  | { type: "unknown"; raw: string };

export async function streamChatCompletion(options: {
  token: string;
  conversationId: string;
  content: string;
  imageUrl?: string | null;
  model?: string;
}) {
  const response = await fetch(`${API_BASE_URL}/chat/${options.conversationId}/messages`, {
    method: "POST",
    headers: buildHeaders(options.token, { Accept: "text/event-stream" }),
    body: JSON.stringify({
      content: options.content,
      image_url: options.imageUrl ?? null,
      model: options.model ?? undefined,
    }),
  });

  if (!response.ok || !response.body) {
    const error: ApiError = new Error("Failed to start streaming response");
    error.status = response.status;
    throw error;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  async function* iterator(): AsyncGenerator<StreamingChunk, void, unknown> {
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        if (buffer.trim().length > 0) {
          yield parseSseChunk(buffer);
        }
        break;
      }
      buffer += decoder.decode(value, { stream: true });

      const parts = buffer.split("\n\n");
      buffer = parts.pop() ?? "";
      for (const part of parts) {
        if (part.trim().length > 0) {
          yield parseSseChunk(part);
        }
      }
    }
  }

  return iterator();
}

const parseSseChunk = (raw: string): StreamingChunk => {
  const lines = raw.split("\n");
  let eventType: string | undefined;
  let dataPayload = "";

  for (const line of lines) {
    if (line.startsWith("event:")) {
      eventType = line.replace("event:", "").trim();
    } else if (line.startsWith("data:")) {
      dataPayload += line.replace("data:", "").trim();
    }
  }

  if (eventType === "start") {
    try {
      const parsed = JSON.parse(dataPayload);
      return { type: "start", message_id: parsed.message_id };
    } catch {
      return { type: "unknown", raw };
    }
  }

  if (eventType === "end") {
    try {
      const parsed = JSON.parse(dataPayload);
      return { type: "end", assistant_message_id: parsed.assistant_message_id };
    } catch {
      return { type: "unknown", raw };
    }
  }

  if (dataPayload) {
    return { type: "data", content: dataPayload };
  }

  return { type: "unknown", raw };
};
