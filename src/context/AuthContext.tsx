import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { api, ApiError } from "@/lib/api";

type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated";

interface AuthUser {
  id: string;
  email: string;
  name?: string;
  plan: string;
  dailyMessagesUsed: number;
  dailyImagesUsed: number;
}

interface AuthContextValue {
  status: AuthStatus;
  user: AuthUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const STORAGE_KEY = "nutrifit-token";

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [status, setStatus] = useState<AuthStatus>("idle");
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(STORAGE_KEY));
  const [error, setError] = useState<string | null>(null);

  const persistToken = useCallback((value: string | null) => {
    if (value) {
      localStorage.setItem(STORAGE_KEY, value);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
    setToken(value);
  }, []);

  const mapSession = useCallback(
    (session: Awaited<ReturnType<typeof api.session>>) => ({
      id: session.user_id,
      email: session.email,
      name: session.name,
      plan: session.plan,
      dailyMessagesUsed: session.daily_messages_used,
      dailyImagesUsed: session.daily_images_used,
    }),
    [],
  );

  const refreshSession = useCallback(async () => {
    if (!token) {
      setStatus("unauthenticated");
      setUser(null);
      return;
    }
    setStatus("loading");
    try {
      const session = await api.session(token);
      setUser(mapSession(session));
      setStatus("authenticated");
      setError(null);
    } catch (err) {
      console.error("Session refresh failed", err);
      persistToken(null);
      setUser(null);
      setStatus("unauthenticated");
      if ((err as ApiError).status === 401) {
        setError("Sessao expirada. Faz login novamente.");
      }
    }
  }, [token, mapSession, persistToken]);

  const login = useCallback(
    async (email: string, password: string) => {
      setStatus("loading");
      try {
        const { token: newToken } = await api.login(email, password);
        persistToken(newToken);
        const session = await api.session(newToken);
        setUser(mapSession(session));
        setStatus("authenticated");
        setError(null);
      } catch (err) {
        persistToken(null);
        setStatus("unauthenticated");
        const apiError = err as ApiError;
        if (apiError.status === 401) {
          setError("Credenciais invalidas. Verifica email e palavra-passe.");
        } else {
          setError("Nao foi possivel iniciar sessao. Tenta novamente.");
        }
        throw err;
      }
    },
    [mapSession, persistToken],
  );

  const signup = useCallback(
    async (email: string, password: string) => {
      setStatus("loading");
      try {
        const { token: newToken } = await api.signup(email, password);
        persistToken(newToken);
        const session = await api.session(newToken);
        setUser(mapSession(session));
        setStatus("authenticated");
        setError(null);
      } catch (err) {
        persistToken(null);
        setStatus("unauthenticated");
        const apiError = err as ApiError;
        if (apiError.status === 400) {
          setError("Registo invalido. Verifica os dados introduzidos.");
        } else {
          setError("Nao foi possivel concluir o registo.");
        }
        throw err;
      }
    },
    [mapSession, persistToken],
  );

  const logout = useCallback(async () => {
    if (!token) {
      setStatus("unauthenticated");
      setUser(null);
      return;
    }
    try {
      await api.logout(token);
    } catch (err) {
      console.warn("Logout falhou, a ignorar", err);
    }
    persistToken(null);
    setUser(null);
    setStatus("unauthenticated");
  }, [token, persistToken]);

  useEffect(() => {
    if (token) {
      refreshSession();
    } else {
      setStatus("unauthenticated");
    }
  }, [token, refreshSession]);

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      user,
      token,
      login,
      signup,
      logout,
      refreshSession,
      error,
      clearError: () => setError(null),
    }),
    [status, user, token, login, signup, logout, refreshSession, error],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

