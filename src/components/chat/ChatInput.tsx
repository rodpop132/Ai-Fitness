import { useState, useRef } from "react";
import { Send, ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSendMessage: (message: string, imageDataUrl?: string) => void;
  onSuggestionClick?: (suggestion: string) => void;
  disabled?: boolean;
  placeholder?: string;
  suggestions?: string[];
}

export const ChatInput = ({
  onSendMessage,
  onSuggestionClick,
  disabled = false,
  placeholder = "Escreve a tua mensagem ou envia uma foto do teu prato!",
  suggestions,
}: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSend = () => {
    if (!message.trim() && !imagePreview) return;
    onSendMessage(message.trim(), imagePreview || undefined);
    setMessage("");
    handleRemoveImage();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="space-y-3 border-t border-border/70 bg-card/80 p-4 backdrop-blur">
      {suggestions && suggestions.length > 0 && (
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

      {imagePreview && (
        <div className="relative inline-block rounded-xl border border-primary/30 bg-background/80 p-2 shadow-sm">
          <img src={imagePreview} alt="Pre-visualizacao" className="h-24 w-auto rounded-lg object-cover" />
          <Button
            onClick={handleRemoveImage}
            variant="destructive"
            size="icon"
            className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
            aria-label="Remover imagem"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}

      <div className="flex items-end gap-3">
        <div className="relative flex-1">
          <Textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="min-h-[64px] max-h-[220px] resize-none rounded-2xl border-2 border-border/70 bg-background/80 pr-12 shadow-sm focus:border-primary focus:ring-0"
          />
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            variant="ghost"
            size="icon"
            disabled={disabled}
            className="absolute bottom-2 right-2 h-9 w-9 rounded-full border border-primary/20 bg-primary/5 text-primary hover:bg-primary/15"
          >
            <ImagePlus className="h-4 w-4" />
          </Button>
        </div>

        <Button
          onClick={handleSend}
          disabled={disabled || (!message.trim() && !imagePreview)}
          size="icon"
          className="h-14 w-14 rounded-2xl bg-primary text-primary-foreground shadow-glow transition hover:shadow-glow-strong"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Dica: partilha objetivos, restricoes alimentares ou horario de treinos para obter recomendacoes precisas.
      </p>
    </div>
  );
};

