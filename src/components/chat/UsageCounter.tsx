import { MessageSquare, Image, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface UsageCounterProps {
  messagesUsed: number;
  messagesLimit: number;
  imagesUsed: number;
  imagesLimit: number;
  resetTime?: string;
}

export const UsageCounter = ({
  messagesUsed,
  messagesLimit,
  imagesUsed,
  imagesLimit,
  resetTime = "23:45",
}: UsageCounterProps) => {
  const messagePercent = messagesLimit > 0 ? Math.min(100, (messagesUsed / messagesLimit) * 100) : 0;
  const imagePercent = imagesLimit > 0 ? Math.min(100, (imagesUsed / imagesLimit) * 100) : 0;

  const getColorClass = (percent: number) => {
    if (percent >= 90) return "text-destructive";
    if (percent >= 60) return "text-accent-foreground";
    return "text-primary";
  };

  const getProgressColor = (percent: number) => {
    if (percent >= 90) return "bg-destructive";
    if (percent >= 60) return "bg-accent";
    return "bg-primary";
  };

  const showWarning = messagePercent >= 90 || imagePercent >= 90;

  return (
    <div className="space-y-4 rounded-2xl border border-border/70 bg-card/70 p-4 shadow-sm">
      <div className="flex items-center justify-between gap-6 text-sm">
        <div className="flex items-center gap-2">
          <MessageSquare className={`h-4 w-4 ${getColorClass(messagePercent)}`} />
          <span className="font-medium">
            <span className={getColorClass(messagePercent)}>{messagesUsed}</span>
            <span className="text-muted-foreground">/{messagesLimit}</span>
          </span>
          <span className="text-xs text-muted-foreground">mensagens</span>
        </div>

        <div className="flex items-center gap-2">
          <Image className={`h-4 w-4 ${getColorClass(imagePercent)}`} />
          <span className="font-medium">
            <span className={getColorClass(imagePercent)}>{imagesUsed}</span>
            <span className="text-muted-foreground">/{imagesLimit}</span>
          </span>
          <span className="text-xs text-muted-foreground">imagens</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Progress value={messagePercent} className="h-1.5" indicatorClassName={getProgressColor(messagePercent)} />
          <p className="text-xs text-muted-foreground/80">Renova às {resetTime}</p>
        </div>
        <div className="space-y-1">
          <Progress value={imagePercent} className="h-1.5" indicatorClassName={getProgressColor(imagePercent)} />
          <p className="text-xs text-muted-foreground/80">Uploads com encriptação ponta a ponta</p>
        </div>
      </div>

      {showWarning && (
        <div className="flex items-start gap-2 rounded-xl border border-accent/40 bg-accent/15 p-3 text-xs text-accent-foreground">
          <AlertCircle className="mt-0.5 h-4 w-4 text-accent" />
          <p>Estás muito perto do limite diário. Considera um upgrade para desbloquear mais mensagens e imagens.</p>
        </div>
      )}
    </div>
  );
};

