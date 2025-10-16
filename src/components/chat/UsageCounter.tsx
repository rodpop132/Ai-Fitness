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
<<<<<<< HEAD
  const messagePercent = messagesLimit > 0 ? Math.min(100, (messagesUsed / messagesLimit) * 100) : 0;
  const imagePercent = imagesLimit > 0 ? Math.min(100, (imagesUsed / imagesLimit) * 100) : 0;

=======
  const messagePercent = (messagesUsed / messagesLimit) * 100;
  const imagePercent = (imagesUsed / imagesLimit) * 100;
  
>>>>>>> b70027a8b05f3f1b40cd6b6a2be00ecc89aac79b
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
<<<<<<< HEAD
    <div className="space-y-4 rounded-2xl border border-border/70 bg-card/70 p-4 shadow-sm">
      <div className="flex items-center justify-between gap-6 text-sm">
        <div className="flex items-center gap-2">
          <MessageSquare className={`h-4 w-4 ${getColorClass(messagePercent)}`} />
=======
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-6 text-sm">
        <div className="flex items-center gap-2">
          <MessageSquare className={`w-4 h-4 ${getColorClass(messagePercent)}`} />
>>>>>>> b70027a8b05f3f1b40cd6b6a2be00ecc89aac79b
          <span className="font-medium">
            <span className={getColorClass(messagePercent)}>{messagesUsed}</span>
            <span className="text-muted-foreground">/{messagesLimit}</span>
          </span>
          <span className="text-xs text-muted-foreground">mensagens</span>
        </div>
<<<<<<< HEAD

        <div className="flex items-center gap-2">
          <Image className={`h-4 w-4 ${getColorClass(imagePercent)}`} />
=======
        
        <div className="flex items-center gap-2">
          <Image className={`w-4 h-4 ${getColorClass(imagePercent)}`} />
>>>>>>> b70027a8b05f3f1b40cd6b6a2be00ecc89aac79b
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
<<<<<<< HEAD
          <p className="text-xs text-muted-foreground/80">Renova às {resetTime}</p>
        </div>
        <div className="space-y-1">
          <Progress value={imagePercent} className="h-1.5" indicatorClassName={getProgressColor(imagePercent)} />
          <p className="text-xs text-muted-foreground/80">Uploads com encriptação ponta a ponta</p>
=======
        </div>
        <div className="space-y-1">
          <Progress value={imagePercent} className="h-1.5" indicatorClassName={getProgressColor(imagePercent)} />
>>>>>>> b70027a8b05f3f1b40cd6b6a2be00ecc89aac79b
        </div>
      </div>

      {showWarning && (
<<<<<<< HEAD
        <div className="flex items-start gap-2 rounded-xl border border-accent/40 bg-accent/15 p-3 text-xs text-accent-foreground">
          <AlertCircle className="mt-0.5 h-4 w-4 text-accent" />
          <p>Estás muito perto do limite diário. Considera um upgrade para desbloquear mais mensagens e imagens.</p>
=======
        <div className="flex items-start gap-2 text-xs text-muted-foreground bg-accent/10 border border-accent/20 rounded-lg p-2">
          <AlertCircle className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
          <p>Estás quase no limite diário. Renova em: {resetTime}</p>
>>>>>>> b70027a8b05f3f1b40cd6b6a2be00ecc89aac79b
        </div>
      )}
    </div>
  );
};
<<<<<<< HEAD

=======
>>>>>>> b70027a8b05f3f1b40cd6b6a2be00ecc89aac79b
