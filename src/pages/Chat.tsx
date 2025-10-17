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

type Role = "user" | "assistant";

interface StoredMessage {
  id: string;
  role: Role;
  content: string;
  image?: string;
  timestamp: string;
  createdAt: string;
  suggestions?: string[];
}

interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: StoredMessage[];
  usage: {
    messagesUsed: number;
    messagesLimit: number;
    imagesUsed: number;
    imagesLimit: number;
    resetTime: string;
  };
}

const STORAGE_KEY = "nutrifit-ai-chat-v1";
const ACTIVE_KEY = "nutrifit-ai-active-conversation";

const QUICK_SUGGESTIONS = [
  "Sugere um plano semanal vegetariano de 1800 kcal",
  "Analisa este rotulo de barrita proteica",
  "Cria um treino de forca para 3 dias",
  "Da-me ideias de snacks sem lactose",
];

const formatTime = (date: Date) =>
  date.toLocaleTimeString("pt-PT", {
    hour: "2-digit",
    minute: "2-digit",
  });

const safeRandomId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const createWelcomeMessage = (): StoredMessage => {
  const now = new Date();
  return {
    id: safeRandomId(),
    role: "assistant",
    createdAt: now.toISOString(),
    timestamp: formatTime(now),
    content:
      "Ola! 👋 Sou a NutriFit AI, pronta para gerar planos alimentares e treinos personalizados.\n\nPosso ajudar com:\n• Planos equilibrados em segundos\n• Analises rapidas de fotos e rotulos\n• Ajustes de treino com base nos teus objetivos\n\nPartilha o que precisas e trato do resto! 💪",
    suggestions: [
      "Preciso de um plano alimentar para ganhar massa magra",
      "Sugere um treino funcional de 30 minutos",
      "Quais sao as macros ideais para mim?",
    ],
  };
};

const createInitialConversation = (): Conversation => {
  const welcomeMessage = createWelcomeMessage();
  return {
    id: safeRandomId(),
    title: "Conversa inicial",
    createdAt: welcomeMessage.createdAt,
    updatedAt: welcomeMessage.createdAt,
    messages: [welcomeMessage],
    usage: {
      messagesUsed: 0,
      messagesLimit: 200,
      imagesUsed: 0,
      imagesLimit: 30,
      resetTime: "00:00",
    },
  };
};

const loadConversations = (): Conversation[] => {
  if (typeof window === "undefined") {
    return [createInitialConversation()];
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return [createInitialConversation()];
  }

  try {
    const parsed: Conversation[] = JSON.parse(stored);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return [createInitialConversation()];
    }

    return parsed.map((conversation) => ({
      ...conversation,
      usage:
        conversation.usage ?? {
          messagesUsed: 0,
          messagesLimit: 200,
          imagesUsed: 0,
          imagesLimit: 30,
          resetTime: "00:00",
        },
      messages: (conversation.messages ?? []).map((message) => ({
        ...message,
        suggestions: message.suggestions ?? [],
      })),
    }));
  } catch (error) {
    console.warn("Nao foi possivel recuperar conversas guardadas:", error);
    return [createInitialConversation()];
  }
};

const loadActiveConversationId = (conversations: Conversation[]): string | undefined => {
  if (typeof window === "undefined") return conversations[0]?.id;
  const stored = window.localStorage.getItem(ACTIVE_KEY);
  if (stored && conversations.some((conversation) => conversation.id === stored)) {
    return stored;
  }
  return conversations[0]?.id;
};

const generateTitleFromMessage = (message: string) => {
  const cleaned = message.replace(/\s+/g, " ").trim();
  if (!cleaned) return "Nova conversa";
  return cleaned.length > 42 ? `${cleaned.slice(0, 42)}…` : cleaned;
};

const generateAssistantResponse = (userMessage: string, hasImage: boolean) => {
  const lowerCaseMessage = userMessage.toLowerCase();

  if (hasImage) {
    return {
      content:
        "Obrigada pela imagem! 📸 Aqui vai uma analise rapida:\n\n• Proteina estimada: peito de frango grelhado (~120g)\n• Hidratos: quinoa cozida (~90g)\n• Vegetais: espinafres salteados e tomate\n\nSugestao: adiciona uma gordura saudavel (azeite, abacate, frutos secos) para otimizar absorcao de vitaminas. Queres macros aproximadas ou uma alternativa vegetariana?",
      suggestions: [
        "Calcula macros aproximadas para esta refeicao",
        "Sugere uma opcao vegetariana equivalente",
        "Como posso tornar esta refeicao mais saciante?",
      ],
    };
  }

  const isTrainingFocus =
    lowerCaseMessage.includes("treino") ||
    lowerCaseMessage.includes("forca") ||
    lowerCaseMessage.includes("musculacao");
  const isNutritionFocus =
    lowerCaseMessage.includes("plano") ||
    lowerCaseMessage.includes("aliment") ||
    lowerCaseMessage.includes("refei");
  const isRestriction =
    lowerCaseMessage.includes("lactose") ||
    lowerCaseMessage.includes("gluten") ||
    lowerCaseMessage.includes("sem");
  const isGoalWeight =
    lowerCaseMessage.includes("peso") ||
    lowerCaseMessage.includes("massa") ||
    lowerCaseMessage.includes("definicao");

  if (isTrainingFocus) {
    return {
      content:
        "Vamos desenhar um microciclo de treino inteligente! 💪\n\n1. Indica quantos dias tens disponiveis e o teu nivel atual.\n2. Distribuimos movimentos (push, pull, agachamento, core).\n3. Ajustamos series, repeticoes e carga consoante o objetivo.\n4. Reservamos tempo para mobilidade e recuperacao.\n\nConta-me a tua disponibilidade e historico para avancarmos.",
      suggestions: [
        "Tenho 3 dias disponiveis, nivel intermedio",
        "Quero focar forca e prevenir lesoes",
        "Adiciona mobilidade para ombros e anca",
      ],
    };
  }

  if (isNutritionFocus || isGoalWeight) {
    return {
      content:
        "Vamos montar um plano alimentar alinhado com os teus objetivos. 🔍\n\n• Primeiro confirmamos dados basicos: idade, peso, altura, atividade.\n• Definimos meta calorica e distribuicao de macros.\n• Ajustamos a lista de alimentos favoritos e horarios.\n• Criamos refeicoes com substituicoes sugeridas.\n\nPreferes partilhar os teus dados agora ou queres um plano base de exemplo?",
      suggestions: [
        "Aqui estao os meus dados de base",
        "Sugere um plano low carb de 1800 kcal",
        "Inclui opcoes rapidas para almoco",
      ],
    };
  }

  if (isRestriction) {
    return {
      content:
        "Vamos garantir que as tuas restricoes sao respeitadas. ✅\n\n• Substituimos ingredientes criticos por alternativas seguras.\n• Mantemos variedade de micronutrientes.\n• Indicamos rotulos a evitar e snacks seguros.\n\nComo queres avançar: plano completo, receitas especificas ou lista de produtos?",
      suggestions: [
        "Sugere pequeno-almoco sem lactose",
        "Lista refeicoes sem gluten para jantar",
        "Preciso de snacks rapidos e seguros",
      ],
    };
  }

  return {
    content:
      "Entendi o teu pedido! A NutriFit AI combina dados nutricionais, objetivos de treino e habitos reais para criar recomendacoes personalizadas.\n\nPartilha objetivos (perda de peso, performance, bem-estar), restricoes e preferencias alimentares. Se tiveres dados de wearables ou registos anteriores, posso integra-los tambem.",
    suggestions: [
      "Quero melhorar performance na corrida",
      "Preciso de perder peso de forma sustentavel",
      "Explica como integras dados de wearable",
    ],
  };
};

const Chat = () => {
  const [conversations, setConversations] = useState<Conversation[]>(() => loadConversations());
  const [activeConversationId, setActiveConversationId] = useState<string | undefined>(undefined);
  const [isTyping, setIsTyping] = useState(false);
  const scrollAnchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (conversations.length === 0) {
      const seeded = [createInitialConversation()];
      setConversations(seeded);
      setActiveConversationId(seeded[0].id);
      return;
    }
  }, [conversations]);

  useEffect(() => {
    if (!activeConversationId) {
      const initialId = loadActiveConversationId(conversations);
      if (initialId) {
        setActiveConversationId(initialId);
      }
    }
  }, [conversations, activeConversationId]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    }
  }, [conversations]);

  useEffect(() => {
    if (typeof window !== "undefined" && activeConversationId) {
      window.localStorage.setItem(ACTIVE_KEY, activeConversationId);
    }
  }, [activeConversationId]);

  const activeConversation = useMemo(
    () => conversations.find((conversation) => conversation.id === activeConversationId),
    [conversations, activeConversationId],
  );

  useEffect(() => {
    if (scrollAnchorRef.current) {
      scrollAnchorRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeConversation?.messages.length, isTyping]);

  const sidebarConversations = conversations.map((conversation) => ({
    id: conversation.id,
    title: conversation.title,
    updatedAt: conversation.updatedAt,
    createdAt: conversation.createdAt,
    messageCount: conversation.messages.length,
  }));

  const handleNewChat = () => {
    const newConversation = createInitialConversation();
    setConversations((prev) => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
  };

  const handleSelectChat = (conversationId: string) => {
    setActiveConversationId(conversationId);
  };

  const updateConversation = (conversationId: string, updater: (conversation: Conversation) => Conversation) => {
    setConversations((prev) =>
      prev.map((conversation) => (conversation.id === conversationId ? updater(conversation) : conversation)),
    );
  };

  const handleSendMessage = (message: string, imageDataUrl?: string) => {
    if (!message.trim() && !imageDataUrl) return;

    const currentConversation = activeConversationId
      ? conversations.find((conversation) => conversation.id === activeConversationId)
      : undefined;

    if (!currentConversation) {
      const seededConversation = createInitialConversation();
      setConversations((prev) => [seededConversation, ...prev]);
      setActiveConversationId(seededConversation.id);
      setTimeout(() => handleSendMessage(message, imageDataUrl), 0);
      return;
    }

    const messageDate = new Date();
    const userMessage: StoredMessage = {
      id: safeRandomId(),
      role: "user",
      content: message,
      image: imageDataUrl,
      timestamp: formatTime(messageDate),
      createdAt: messageDate.toISOString(),
    };

    updateConversation(currentConversation.id, (conversation) => {
      const titleShouldUpdate = conversation.messages.length <= 1;
      return {
        ...conversation,
        title: titleShouldUpdate ? generateTitleFromMessage(message) : conversation.title,
        messages: [...conversation.messages, userMessage],
        updatedAt: userMessage.createdAt,
        usage: {
          ...conversation.usage,
          messagesUsed: conversation.usage.messagesUsed + 1,
          imagesUsed: conversation.usage.imagesUsed + (imageDataUrl ? 1 : 0),
        },
      };
    });

    setIsTyping(true);
    setTimeout(() => {
      const responseDate = new Date();
      const responseData = generateAssistantResponse(message, Boolean(imageDataUrl));
      const assistantMessage: StoredMessage = {
        id: safeRandomId(),
        role: "assistant",
        content: responseData.content,
        suggestions: responseData.suggestions,
        timestamp: formatTime(responseDate),
        createdAt: responseDate.toISOString(),
      };

      updateConversation(currentConversation.id, (conversation) => ({
        ...conversation,
        messages: [...conversation.messages, assistantMessage],
        updatedAt: assistantMessage.createdAt,
      }));

      setIsTyping(false);
    }, 900);
  };

  const lastAssistantSuggestions =
    activeConversation?.messages
      .filter((message) => message.role === "assistant")
      .slice(-1)[0]
      ?.suggestions ?? [];

  const inputSuggestions = Array.from(new Set([...lastAssistantSuggestions, ...QUICK_SUGGESTIONS])).slice(0, 4);

  return (
    <div className="container mx-auto flex w-full flex-col gap-6 px-4 pb-8 pt-6 lg:flex-row">
      <div className="hidden h-[calc(100vh-200px)] flex-shrink-0 overflow-hidden rounded-3xl border border-border/60 bg-card/60 lg:block">
        <ChatSidebar
          conversations={sidebarConversations}
          currentConversationId={activeConversationId}
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

            {activeConversation && (
              <div className="w-full max-w-md">
                <UsageCounter
                  messagesUsed={activeConversation.usage.messagesUsed}
                  messagesLimit={activeConversation.usage.messagesLimit}
                  imagesUsed={activeConversation.usage.imagesUsed}
                  imagesLimit={activeConversation.usage.imagesLimit}
                  resetTime={activeConversation.usage.resetTime}
                />
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-col gap-3 lg:hidden">
            <Select value={activeConversationId} onValueChange={handleSelectChat}>
              <SelectTrigger>
                <SelectValue placeholder="Seleciona uma conversa" />
              </SelectTrigger>
              <SelectContent>
                {sidebarConversations.map((conversation) => (
                  <SelectItem key={conversation.id} value={conversation.id}>
                    {conversation.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="secondary" className="gap-2" onClick={handleNewChat}>
              <Brain className="h-4 w-4" />
              Nova conversa
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1 px-4 py-6">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
            {activeConversation?.messages.map((message) => (
              <ChatMessage
                key={message.id}
                role={message.role}
                content={message.content}
                image={message.image}
                timestamp={message.timestamp}
                suggestions={message.suggestions}
                onSuggestionClick={handleSendMessage}
              />
            ))}
            {isTyping && (
              <ChatMessage role="assistant" content="" isTyping timestamp={formatTime(new Date())} suggestions={[]} />
            )}
            <div ref={scrollAnchorRef} />
          </div>
        </ScrollArea>

        <ChatInput
          onSendMessage={handleSendMessage}
          suggestions={inputSuggestions}
          onSuggestionClick={handleSendMessage}
          disabled={isTyping}
        />
      </div>
    </div>
  );
};

export default Chat;

