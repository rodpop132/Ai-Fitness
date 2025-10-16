import { useState, useRef } from "react";
import { Send, ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSendMessage: (message: string, image?: File) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const ChatInput = ({
  onSendMessage,
  disabled = false,
  placeholder = "Escreve a tua mensagem... ou envia uma foto do teu prato! 🍽️",
}: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
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
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSend = () => {
    if (!message.trim() && !image) return;
    onSendMessage(message, image || undefined);
    setMessage("");
    handleRemoveImage();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
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
          </Button>
        </div>

        <Button
          onClick={handleSend}
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
      </p>
    </div>
  );
};
