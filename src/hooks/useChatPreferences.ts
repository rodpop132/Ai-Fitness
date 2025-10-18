import { useCallback, useEffect, useMemo, useState } from "react";

export type ChatModel = "fitai_fast" | "fitai_detailed" | "fitai_nutri";

const STORAGE_KEY = "nutrifit-chat-model";
const EVENT_NAME = "nutrifit:chat-model-change";
const DEFAULT_MODEL: ChatModel = "fitai_detailed";

const isChatModel = (value: string | null | undefined): value is ChatModel =>
  value === "fitai_fast" || value === "fitai_detailed" || value === "fitai_nutri";

const readStoredModel = (): ChatModel => {
  if (typeof window === "undefined") {
    return DEFAULT_MODEL;
  }
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isChatModel(stored) ? stored : DEFAULT_MODEL;
};

export const useChatPreferences = () => {
  const [model, setModelState] = useState<ChatModel>(() => readStoredModel());

  const setModel = useCallback((next: ChatModel) => {
    setModelState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next);
      window.dispatchEvent(new CustomEvent<ChatModel>(EVENT_NAME, { detail: next }));
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY && isChatModel(event.newValue)) {
        setModelState(event.newValue);
      }
    };

    const handleCustomEvent = (event: Event) => {
      const custom = event as CustomEvent<ChatModel>;
      if (custom.detail && isChatModel(custom.detail)) {
        setModelState(custom.detail);
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener(EVENT_NAME, handleCustomEvent as EventListener);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(EVENT_NAME, handleCustomEvent as EventListener);
    };
  }, []);

  return useMemo(
    () => ({
      model,
      setModel,
    }),
    [model, setModel],
  );
};

export const chatModelLabels: Record<ChatModel, { name: string; description: string }> = {
  fitai_fast: {
    name: "FitAI Fast",
    description: "Respostas imediatas para duvidas rapidas e check-ins diarios.",
  },
  fitai_detailed: {
    name: "FitAI Detailed",
    description: "Analises aprofundadas com contexto nutricional e de treino.",
  },
  fitai_nutri: {
    name: "FitAI Nutri",
    description: "Especialista em planeamento alimentar e avaliacao de refeicoes.",
  },
};

export const getChatModelLabel = (model: ChatModel) => chatModelLabels[model].name;
