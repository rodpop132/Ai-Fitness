import { useEffect, useMemo, useRef, useState } from "react";
import { Activity, Brain, Sparkles } from "lucide-react";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { UsageCounter } from "@/components/chat/UsageCounter";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { api, streamChatCompletion, StreamingChunk } from "@/lib/api";

type Role = "user" | "assistant";

interface ChatDisplayMessage {
  id: string;
  role: Role;
  content: string;
  imageUrl?: string | null;
  timestamp: string;
  suggestions?: string[];
  pending?: boolean;
}

interface ConversationSummary {
  id: string;
  title: string;
  createdAt: string;
  updatedAt?: string;
  messageCount: number;
}

interface UsageSnapshot {
  messagesUsed: number;
  messagesLimit: number;
  imagesUsed: number;
  imagesLimit: number;
  resetTime: string;
}

const PLAN_LIMITS: Record<string, { messages: number; images: number }> = {
  free: { messages: 10, images: 3 },
  pro: { messages: 200, images: 30 },
  elite: { messages: 1000, images: 100 },
};

const formatTimestamp = (timestamp?: string) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return date.toLocaleTimeString("pt-PT", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const fallbackSuggestions = [
  "Cria um plano alimentar low carb",
  "Sugere treino funcional de 30 minutos",
  "Analisa o meu ultimo dia de refeicoes",
  "Quais macros ideais para perda de peso",
];

const Chat = () => {
  const { token, user, refreshSession } = useAuth();
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messagesByConversation, setMessagesByConversation] = useState<Record<string, ChatDisplayMessage[]>>({});
  const [isLoadingConversations, setIsLoadingConversations] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [banner, setBanner] = useState<string | null>(null);
  const scrollAnchorRef = useRef<HTMLDivElement>(null);

  const usage = useMemo<UsageSnapshot>(() => {
    const limits = PLAN_LIMITS[user?.plan ?? "free"] ?? PLAN_LIMITS.free;
    return {
      messagesUsed: user?.dailyMessagesUsed ?? 0,
      messagesLimit: limits.messages,
      imagesUsed: user?.dailyImagesUsed ?? 0,
      imagesLimit: limits.images,
      resetTime: "00:00",
    };
  }, [user]);

  useEffect(() => {
    if (!token) return;

    const loadConversations = async () => {
      setIsLoadingConversations(true);
      try {
        const result = await api.listConversations(token, 1, 50);
        const mapped: ConversationSummary[] = result.items.map((item) => ({
          id: item.id,
          title: item.title || "Conversa sem titulo",
          createdAt: item.created_at,
          updatedAt: item.updated_at,
          messageCount: 0,
        }));
        setConversations(mapped);
        if (mapped.length > 0) {
          setActiveConversationId((prev) => prev ?? mapped[0].id);
        }
      } catch (error) {
        console.error("Falha a carregar conversas", error);
        setBanner("Nao foi possivel carregar conversas. Tenta novamente.");
      } finally {
        setIsLoadingConversations(false);
      }
    };

    loadConversations();
  }, [token]);

  useEffect(() => {
    if (!activeConversationId || !token) return;
    if (messagesByConversation[activeConversationId]) return;

    const loadMessages = async () => {
      setIsLoadingMessages(true);
      try {
        const data = await api.fetchConversationMessages(token, activeConversationId);
        const remoteMessages: ChatDisplayMessage[] = Array.isArray(data?.messages)
          ? data.messages.map((msg: any) => ({
              id: msg.id ?? crypto.randomUUID(),
              role: msg.role ?? "assistant",
              content: msg.content ?? "",
              imageUrl: msg.image_url ?? null,
              timestamp: formatTimestamp(msg.created_at),
              suggestions: msg.suggestions ?? [],
            }))
          : [];

        setMessagesByConversation((prev) => ({
          ...prev,
          [activeConversationId]: remoteMessages,
        }));
        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === activeConversationId ? { ...conv, messageCount: remoteMessages.length } : conv,
          ),
        );
      } catch (error) {
        console.warn("Nao foi possivel obter mensagens da conversa", error);
        setMessagesByConversation((prev) => ({
          ...prev,
          [activeConversationId]: [],
        }));
      } finally {
        setIsLoadingMessages(false);
      }
    };

    loadMessages();
  }, [activeConversationId, token, messagesByConversation]);

  useEffect(() => {
    if (scrollAnchorRef.current) {
      scrollAnchorRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messagesByConversation, activeConversationId, isStreaming]);

  const currentMessages = activeConversationId ? messagesByConversation[activeConversationId] ?? [] : [];

  const updateMessages = (conversationId: string, updater: (messages: ChatDisplayMessage[]) => ChatDisplayMessage[]) => {
    setMessagesByConversation((prev) => ({
      ...prev,
      [conversationId]: updater(prev[conversationId] ?? []),
    }));
  };

  const handleNewChat = async (): Promise<string | undefined> => {
    if (!token) return undefined;
    try {
      const created = await api.createConversation(token, "Nova conversa");
      const summary: ConversationSummary = {
        id: created.id,
        title: created.title,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        messageCount: 0,
      };
      setConversations((prev) => [summary, ...prev]);
      setMessagesByConversation((prev) => ({ ...prev, [summary.id]: [] }));
      setActiveConversationId(summary.id);
      return summary.id;
    } catch (error) {
      console.error("Nao foi possivel criar conversa", error);
      setBanner("Erro ao criar nova conversa. Tenta novamente.");
      return undefined;
    }
  };

  const handleSelectChat = (conversationId: string) => {
    setActiveConversationId(conversationId);
  };

  const handleSendMessage = async (content: string, imageFile?: File) => {
    if (!token) {
      setBanner("Precisas de iniciar sessao para enviar mensagens.");
      return;
    }
    if (isStreaming) return;

    const trimmedContent = content.trim();
    if (!trimmedContent && !imageFile) return;

    setBanner(null);
    setIsStreaming(true);

    let conversationId = activeConversationId;
    if (!conversationId) {
      conversationId = await handleNewChat();
    }

    if (!conversationId) {
      setIsStreaming(false);
      return;
    }

    const timestamp = formatTimestamp(new Date().toISOString());
    const userMessage: ChatDisplayMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedContent,
      imageUrl: undefined,
      timestamp,
    };

    updateMessages(conversationId, (prev) => [...prev, userMessage]);

    // Image upload placeholder - generate URL and upload if a file is provided.
    let imageUrl: string | null = null;
    if (imageFile) {
      try {
        const signed = await api.generateUploadUrl(token, imageFile.name, imageFile.type);
        await fetch(signed.upload_url, {
          method: "PUT",
          headers: signed.headers,
          body: imageFile,
        });
        imageUrl = signed.upload_url;
      } catch (error) {
        console.error("Falha no upload da imagem", error);
        setBanner("Nao foi possivel carregar a imagem. Tenta novamente.");
      }
    }

    const assistantMessageId = crypto.randomUUID();
    const assistantMessage: ChatDisplayMessage = {
      id: assistantMessageId,
      role: "assistant",
      content: "",
      imageUrl: null,
      timestamp: formatTimestamp(new Date().toISOString()),
      pending: true,
    };

    updateMessages(conversationId, (prev) => [...prev, assistantMessage]);

    try {
      const stream = await streamChatCompletion({
        token,
        conversationId,
        content: trimmedContent,
        imageUrl,
      });

      for await (const chunk of stream) {
        applyStreamingChunk(conversationId, assistantMessageId, chunk);
      }

      await refreshSession().catch(() => undefined);
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === conversationId
            ? { ...conv, updatedAt: new Date().toISOString(), messageCount: conv.messageCount + 1 }
            : conv,
        ),
      );
    } catch (error) {
      console.error("Erro ao enviar mensagem", error);
      setBanner(
        (error as { status?: number }).status === 402
          ? "Atingiste o limite diario de mensagens. Faz upgrade para um plano superior."
          : "Nao foi possivel obter resposta. Tenta novamente.",
      );
      updateMessages(conversationId, (prev) => prev.filter((msg) => msg.id !== assistantMessageId));
    } finally {
      setIsStreaming(false);
    }
  };

  const applyStreamingChunk = (conversationId: string, messageId: string, chunk: StreamingChunk) => {
    if (chunk.type === "data" && chunk.content) {
      updateMessages(conversationId, (prev) =>
        prev.map((msg) =>
          msg.id === messageId
            ? {
                ...msg,
                content: `${msg.content}${chunk.content}`,
              }
            : msg,
        ),
      );
    }

    if (chunk.type === "end") {
      updateMessages(conversationId, (prev) =>
        prev.map((msg) =>
          msg.id === messageId
            ? {
                ...msg,
                id: chunk.assistant_message_id || messageId,
                pending: false,
              }
            : msg,
        ),
      );
    }
  };

  const currentUsage: UsageSnapshot = useMemo(() => {
    const current = usage;
    if (!isStreaming) {
      return current;
    }
    return { ...current };
  }, [usage, isStreaming]);

  return (
    <div className="container mx-auto flex w-full flex-col gap-6 px-4 pb-8 pt-6 lg:flex-row">
      <div className="hidden h-[calc(100vh-160px)] flex-shrink-0 lg:block">
        <ChatSidebar
          conversations={conversations}
          currentConversationId={activeConversationId || undefined}
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
        />
      </div>

      <div className="flex h-[calc(100vh-160px)] flex-1 flex-col overflow-hidden rounded-3xl border border-border/60 bg-card/70 shadow-lg">
        <div className="border-b border-border/60 bg-background/80 px-4 py-4 backdrop-blur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <Activity className="h-5 w-5" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-display font-semibold">Assistente NutriFit AI</h1>
                  <Badge variant="secondary" className="gap-1 border-primary/30 bg-primary/10 text-primary">
                    <Sparkles className="h-3 w-3" />
                    Pro
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Partilha objetivos, fotos ou metricas e recebe recomendacoes em segundos.
                </p>
              </div>
            </div>

            <div className="hidden w-full max-w-md lg:block">
              <UsageCounter
                messagesUsed={currentUsage.messagesUsed}
                messagesLimit={currentUsage.messagesLimit}
                imagesUsed={currentUsage.imagesUsed}
                imagesLimit={currentUsage.imagesLimit}
                resetTime={currentUsage.resetTime}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 lg:hidden">
            <Select value={activeConversationId ?? undefined} onValueChange={setActiveConversationId}>
              <SelectTrigger>
                <SelectValue placeholder="Seleciona uma conversa" />
              </SelectTrigger>
              <SelectContent>
                {conversations.map((conversation) => (
                  <SelectItem key={conversation.id} value={conversation.id}>
                    {conversation.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                className="grow gap-2 rounded-xl"
                onClick={handleNewChat}
                disabled={isLoadingConversations}
              >
                <Brain className="h-4 w-4" />
                Nova conversa
              </Button>
              <UsageCounter
                messagesUsed={currentUsage.messagesUsed}
                messagesLimit={currentUsage.messagesLimit}
                imagesUsed={currentUsage.imagesUsed}
                imagesLimit={currentUsage.imagesLimit}
                resetTime={currentUsage.resetTime}
              />
            </div>
          </div>
        </div>

        {banner && (
          <div className="border-b border-border/70 bg-destructive/10 px-4 py-2 text-sm text-destructive">{banner}</div>
        )}

        <ScrollArea className="flex-1 px-4 py-6">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
            {isLoadingMessages && currentMessages.length === 0 ? (
              <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
                A carregar mensagens...
              </div>
            ) : (
              currentMessages.map((message) => (
                <ChatMessage
                  key={message.id}
                  role={message.role}
                  content={message.content}
                  image={message.imageUrl ?? undefined}
                  timestamp={message.timestamp}
                  isTyping={message.pending}
                  suggestions={message.suggestions}
                  onSuggestionClick={(suggestion) => handleSendMessage(suggestion)}
                />
              ))
            )}
            <div ref={scrollAnchorRef} />
          </div>
        </ScrollArea>

        <ChatInput
          onSendMessage={handleSendMessage}
          suggestions={currentMessages.length === 0 ? fallbackSuggestions : undefined}
          onSuggestionClick={(suggestion) => handleSendMessage(suggestion)}
          disabled={isStreaming}
        />
      </div>
    </div>
  );
};

export default Chat;


