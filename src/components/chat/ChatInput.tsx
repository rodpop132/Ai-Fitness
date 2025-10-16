import { useState, useRef } from "react";
import { Send, ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
<<<<<<< HEAD
  onSendMessage: (message: string, imageDataUrl?: string) => void;
  onSuggestionClick?: (suggestion: string) => void;
  disabled?: boolean;
  placeholder?: string;
  suggestions?: string[];
=======
  onSendMessage: (message: string, image?: File) => void;
  disabled?: boolean;
  placeholder?: string;
>>>>>>> b70027a8b05f3f1b40cd6b6a2be00ecc89aac79b
}

export const ChatInput = ({
  onSendMessage,
<<<<<<< HEAD
  onSuggestionClick,
  disabled = false,
  placeholder = "Escreve a tua mensagem… ou envia uma foto do teu prato! 🍽️",
  suggestions,
}: ChatInputProps) => {
  const [message, setMessage] = useState("");
=======
  disabled = false,
  placeholder = "Escreve a tua mensagem... ou envia uma foto do teu prato! 🍽️",
}: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<File | null>(null);
>>>>>>> b70027a8b05f3f1b40cd6b6a2be00ecc89aac79b
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
<<<<<<< HEAD
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
=======
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
>>>>>>> b70027a8b05f3f1b40cd6b6a2be00ecc89aac79b
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSend = () => {
<<<<<<< HEAD
    if (!message.trim() && !imagePreview) return;
    onSendMessage(message.trim(), imagePreview || undefined);
=======
    if (!message.trim() && !image) return;
    onSendMessage(message, image || undefined);
>>>>>>> b70027a8b05f3f1b40cd6b6a2be00ecc89aac79b
    setMessage("");
    handleRemoveImage();
  };

<<<<<<< HEAD
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
=======
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
>>>>>>> b70027a8b05f3f1b40cd6b6a2be00ecc89aac79b
      handleSend();
    }
  };

  return (
<<<<<<< HEAD
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
          <img src={imagePreview} alt="Pré-visualização" className="h-24 w-auto rounded-lg object-cover" />
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
=======
    <div className="border-t bg-card p-4 space-y-3">
      {/* Image Preview */}
      {imagePreview && (
        <div className="relative inline-block animate-fade-in">
          <img 
            src={imagePreview} 
            alt="Preview" 
            className="h-20 rounded-lg border-2 border-primary/20"
          />
          <Button
            onClick={handleRemoveImage}
            variant="destructive"
            size="sm"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
          >
            <X className="w-3 h-3" />
          </Button>
          <span className="absolute -bottom-6 left-0 text-xs text-muted-foreground">
            {image?.name}
          </span>
        </div>
      )}

      {/* Input Area */}
      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className="min-h-[56px] max-h-[200px] resize-none pr-12 rounded-xl border-2 focus:border-primary transition-colors"
            rows={1}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="ghost"
            size="sm"
            disabled={disabled || !!image}
            className="absolute right-2 bottom-2 h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
          >
            <ImagePlus className="w-4 h-4" />
>>>>>>> b70027a8b05f3f1b40cd6b6a2be00ecc89aac79b
          </Button>
        </div>

        <Button
          onClick={handleSend}
<<<<<<< HEAD
          disabled={disabled || (!message.trim() && !imagePreview)}
          size="icon"
          className="h-14 w-14 rounded-2xl bg-primary text-primary-foreground shadow-glow transition hover:shadow-glow-strong"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Dica: partilha objetivos, restrições alimentares ou horário de treinos para obter recomendações precisas.
=======
          disabled={disabled || (!message.trim() && !image)}
          className="gradient-ai text-white h-14 w-14 rounded-xl hover:opacity-90 hover-scale shadow-glow shrink-0"
          size="icon"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>

      {/* Hint */}
      <p className="text-xs text-muted-foreground text-center">
        Podes enviar uma foto do teu prato para análise nutricional 🍽️
>>>>>>> b70027a8b05f3f1b40cd6b6a2be00ecc89aac79b
      </p>
    </div>
  );
};
<<<<<<< HEAD

=======
>>>>>>> b70027a8b05f3f1b40cd6b6a2be00ecc89aac79b
