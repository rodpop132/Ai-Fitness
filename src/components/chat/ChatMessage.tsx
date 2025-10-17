import { User, Bot, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  image?: string;
  timestamp?: string;
  isTyping?: boolean;
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
}

export const ChatMessage = ({
  role,
  content,
  image,
  timestamp,
  isTyping = false,
  suggestions,
  onSuggestionClick,
}: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} animate-fade-in`}>
      <div className={`max-w-[80%] space-y-3 ${isUser ? "items-end" : "items-start"}`}>
        <div className={`flex items-center gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              isUser ? "bg-primary text-primary-foreground" : "gradient-ai text-white shadow-glow"
            }`}
          >
            {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
          </div>
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {isUser ? "Tu" : "NutriFit AI"}
          </span>
          {timestamp && <span className="text-xs text-muted-foreground">• {timestamp}</span>}
        </div>

        <div
          className={`rounded-2xl p-4 ${
            isUser
              ? "border border-primary/20 bg-primary/10 text-foreground shadow-sm"
              : "border border-primary/30 bg-card/95 text-foreground shadow-md"
          }`}
        >
          {image && (
            <img
              src={image}
              alt="Imagem carregada"
              className="mb-3 max-w-full rounded-xl border border-border/60 shadow-sm transition hover:scale-[1.02]"
            />
          )}

          {isTyping ? (
            <div className="flex items-center gap-1.5 text-primary">
              <span className="h-2 w-2 rounded-full bg-current animate-typing" style={{ animationDelay: "0s" }} />
              <span className="h-2 w-2 rounded-full bg-current animate-typing" style={{ animationDelay: "0.2s" }} />
              <span className="h-2 w-2 rounded-full bg-current animate-typing" style={{ animationDelay: "0.4s" }} />
            </div>
          ) : (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
          )}
        </div>

        {!isUser && !isTyping && suggestions && suggestions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => onSuggestionClick?.(suggestion)}
                className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition hover:bg-primary/20"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {!isUser && !isTyping && (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-primary">
              <ThumbsUp className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-primary">
              <ThumbsDown className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

