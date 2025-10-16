import { User, Bot, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  image?: string;
  timestamp?: string;
  isTyping?: boolean;
<<<<<<< HEAD
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
=======
>>>>>>> b70027a8b05f3f1b40cd6b6a2be00ecc89aac79b
}

export const ChatMessage = ({
  role,
  content,
  image,
  timestamp,
  isTyping = false,
<<<<<<< HEAD
  suggestions,
  onSuggestionClick,
=======
>>>>>>> b70027a8b05f3f1b40cd6b6a2be00ecc89aac79b
}: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} animate-fade-in`}>
<<<<<<< HEAD
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
=======
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
>>>>>>> b70027a8b05f3f1b40cd6b6a2be00ecc89aac79b
            </div>
          ) : (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
          )}
        </div>

<<<<<<< HEAD
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
=======
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
>>>>>>> b70027a8b05f3f1b40cd6b6a2be00ecc89aac79b
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
<<<<<<< HEAD

=======
>>>>>>> b70027a8b05f3f1b40cd6b6a2be00ecc89aac79b
