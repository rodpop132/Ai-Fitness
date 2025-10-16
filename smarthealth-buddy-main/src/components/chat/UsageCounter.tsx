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
  const messagePercent = (messagesUsed / messagesLimit) * 100;
  const imagePercent = (imagesUsed / imagesLimit) * 100;
  
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
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-6 text-sm">
        <div className="flex items-center gap-2">
          <MessageSquare className={`w-4 h-4 ${getColorClass(messagePercent)}`} />
          <span className="font-medium">
            <span className={getColorClass(messagePercent)}>{messagesUsed}</span>
            <span className="text-muted-foreground">/{messagesLimit}</span>
          </span>
          <span className="text-xs text-muted-foreground">mensagens</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Image className={`w-4 h-4 ${getColorClass(imagePercent)}`} />
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
        </div>
        <div className="space-y-1">
          <Progress value={imagePercent} className="h-1.5" indicatorClassName={getProgressColor(imagePercent)} />
        </div>
      </div>

      {showWarning && (
        <div className="flex items-start gap-2 text-xs text-muted-foreground bg-accent/10 border border-accent/20 rounded-lg p-2">
          <AlertCircle className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
          <p>Estás quase no limite diário. Renova em: {resetTime}</p>
        </div>
      )}
    </div>
  );
};
