import { useState } from "react";
import { Activity } from "lucide-react";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { UsageCounter } from "@/components/chat/UsageCounter";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  image?: string;
  timestamp: string;
}

const Chat = () => {
  const [conversations] = useState([
    { id: "1", title: "Plano de alimentação semanal", date: "Hoje" },
    { id: "2", title: "Análise de rótulo nutricional", date: "Ontem" },
    { id: "3", title: "Treino de força para iniciantes", date: "Há 2 dias" },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Olá! 👋 Sou o teu assistente de nutrição e treino. Como posso ajudar-te hoje?\n\nPodes:\n• Perguntar sobre planos alimentares\n• Enviar fotos de pratos para análise nutricional\n• Pedir conselhos de treino\n• Esclarecer dúvidas sobre suplementação",
      timestamp: "14:30",
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (content: string, image?: File) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      image: image ? URL.createObjectURL(image) : undefined,
      timestamp: new Date().toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: image 
          ? "Óptima foto! 📸 Vejo que tens aqui um prato equilibrado.\n\n**O que vejo:**\n• Proteína: Peito de frango grelhado (~150g)\n• Carboidratos: Arroz integral (~100g)\n• Vegetais: Brócolos e cenoura\n\n**Análise nutricional estimada:**\n• Calorias: ~450 kcal\n• Proteína: 45g\n• Carboidratos: 50g\n• Gordura: 8g\n\n💡 **Sugestão:** Adiciona uma fonte de gordura saudável (azeite, abacate) para melhor absorção de vitaminas!"
          : "Claro! Posso ajudar-te com isso. Para te dar uma resposta mais personalizada, conta-me um pouco sobre:\n\n• Os teus objetivos (perder peso, ganhar massa, manter?)\n• Restrições alimentares\n• Nível de atividade física\n\nAssim consigo criar um plano totalmente adaptado a ti! 💪",
        timestamp: new Date().toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <ChatSidebar
        conversations={conversations}
        currentConversationId="1"
        onNewChat={() => console.log("New chat")}
        onSelectChat={(id) => console.log("Select chat", id)}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b bg-card px-6 py-4">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              <h1 className="text-lg font-display font-bold">NutriFit AI</h1>
            </div>
            
            <div className="flex-1 max-w-md ml-8">
              <UsageCounter
                messagesUsed={7}
                messagesLimit={10}
                imagesUsed={2}
                imagesLimit={3}
              />
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 px-6 py-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((message) => (
              <ChatMessage key={message.id} {...message} />
            ))}
            {isTyping && (
              <ChatMessage
                role="assistant"
                content=""
                isTyping={true}
              />
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="max-w-4xl mx-auto w-full">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
