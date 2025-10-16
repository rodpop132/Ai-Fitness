import { User, Bot, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  image?: string;
  timestamp?: string;
  isTyping?: boolean;
}

export const ChatMessage = ({
  role,
  content,
  image,
  timestamp,
  isTyping = false,
}: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} animate-fade-in`}>
      <div className={`max-w-[80%] space-y-2 ${isUser ? "items-end" : "items-start"}`}>
        {/* Header */}
        <div className={`flex items-center gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
            isUser ? "bg-primary text-primary-foreground" : "gradient-ai text-white"
          }`}>
            {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
          </div>
          <span className="text-xs text-muted-foreground font-medium">
            {isUser ? "Tu" : "NutriFit AI"}
          </span>
          {timestamp && (
            <span className="text-xs text-muted-foreground">• {timestamp}</span>
          )}
        </div>

        {/* Message Content */}
        <div className={`rounded-2xl p-4 ${
          isUser 
            ? "bg-primary/10 border border-primary/20" 
            : "gradient-ai text-white shadow-glow"
        }`}>
          {image && (
            <img 
              src={image} 
              alt="Uploaded" 
              className="rounded-lg mb-3 max-w-full hover:scale-105 transition-transform duration-300 cursor-pointer"
            />
          )}
          
          {isTyping ? (
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-current animate-typing" style={{ animationDelay: "0s" }} />
              <span className="w-2 h-2 rounded-full bg-current animate-typing" style={{ animationDelay: "0.2s" }} />
              <span className="w-2 h-2 rounded-full bg-current animate-typing" style={{ animationDelay: "0.4s" }} />
            </div>
          ) : (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
          )}
        </div>

        {/* Feedback Buttons (only for AI messages) */}
        {!isUser && !isTyping && (
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="sm"
              className="h-7 w-7 p-0 hover:bg-muted"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="h-7 w-7 p-0 hover:bg-muted"
            >
              <ThumbsDown className="w-3.5 h-3.5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
