import { Plus, MessageCircle, Sparkles, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ConversationSummary {
  id: string;
  title: string;
  updatedAt: string;
  createdAt: string;
  messageCount: number;
}

interface ChatSidebarProps {
  conversations: ConversationSummary[];
  currentConversationId?: string;
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
}

export const ChatSidebar = ({
  conversations,
  currentConversationId,
  onNewChat,
  onSelectChat,
}: ChatSidebarProps) => {
  const formatTimestamp = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleString("pt-PT", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "short",
    });
  };

  return (
    <aside className="flex h-full w-full max-w-[300px] flex-col border-r border-border/80 bg-sidebar">
      <div className="space-y-4 border-b border-border/70 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary/70">Workspaces</p>
            <h2 className="text-lg font-display font-semibold">Assistente</h2>
          </div>
          <Badge variant="outline" className="border-primary/40 text-primary">
            Beta
          </Badge>
        </div>
        <Button onClick={onNewChat} className="w-full gap-2 gradient-ai text-white shadow-glow hover:shadow-glow-strong">
          <Plus className="h-4 w-4" />
          Nova conversa
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-2">
          {conversations.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border/70 bg-card/70 p-4 text-center text-sm text-muted-foreground">
              <Sparkles className="mx-auto mb-3 h-5 w-5 text-primary" />
              <p>Comeca um chat para gerar planos ou analisar refeicoes.</p>
            </div>
          )}

          {conversations.map((conversation) => {
            const isActive = conversation.id === currentConversationId;
            return (
              <button
                key={conversation.id}
                onClick={() => onSelectChat(conversation.id)}
                className={`w-full rounded-2xl border px-4 py-3 text-left transition-all ${
                  isActive
                    ? "border-primary/50 bg-primary/10 shadow-glow"
                    : "border-border/70 bg-card/80 hover:border-primary/30 hover:bg-card"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/15 text-primary">
                      <MessageCircle className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{conversation.title}</p>
                      <div className="mt-1 flex items-center gap-2 text-[11px] uppercase tracking-widest text-muted-foreground">
                        <span>{conversation.messageCount} mensagens</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-[11px] uppercase tracking-widest text-muted-foreground/80">
                  <Clock className="h-3 w-3" />
                  <span>Atualizado {formatTimestamp(conversation.updatedAt)}</span>
                </div>
              </button>
            );
          })}
        </div>
      </ScrollArea>

      <div className="space-y-3 border-t border-border/70 p-4">
        <p className="text-xs text-muted-foreground">
          O chatbot aprende com as tuas interacoes. Partilha feedback para acelerar melhorias.
        </p>
        <Separator />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Plano atual</span>
          <Badge variant="secondary" className="border-primary/30 bg-primary/10 text-primary">
            Pro
          </Badge>
        </div>
      </div>
    </aside>
  );
};

