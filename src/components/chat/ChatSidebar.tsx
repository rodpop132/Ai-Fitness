<<<<<<< HEAD
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
=======
import { Plus, MessageSquare, Settings, CreditCard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface ChatSidebarProps {
  conversations: Array<{ id: string; title: string; date: string }>;
>>>>>>> b70027a8b05f3f1b40cd6b6a2be00ecc89aac79b
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
<<<<<<< HEAD
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
              <p>Começa um chat para gerar planos ou analisar refeições.</p>
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
          O chatbot aprende com as tuas interações. Partilha feedback para acelerar melhorias.
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

=======
  return (
    <div className="h-screen w-[280px] bg-card border-r flex flex-col">
      {/* Header */}
      <div className="p-4">
        <Button 
          onClick={onNewChat}
          className="w-full gradient-ai text-white hover:opacity-90 hover-scale shadow-glow"
          size="lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Chat
        </Button>
      </div>

      {/* Conversations List */}
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1 py-2">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => onSelectChat(conv.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 group hover:bg-secondary ${
                currentConversationId === conv.id 
                  ? 'bg-primary/10 border border-primary/20' 
                  : 'hover:bg-secondary'
              }`}
            >
              <div className="flex items-start gap-2">
                <MessageSquare className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{conv.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{conv.date}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>

      <Separator />

      {/* Footer Actions */}
      <div className="p-4 space-y-1">
        <Button variant="ghost" className="w-full justify-start" size="sm">
          <Settings className="w-4 h-4 mr-2" />
          Definições
        </Button>
        <Button variant="ghost" className="w-full justify-start" size="sm">
          <CreditCard className="w-4 h-4 mr-2" />
          Preços
        </Button>
        <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10" size="sm">
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      </div>
    </div>
  );
};
>>>>>>> b70027a8b05f3f1b40cd6b6a2be00ecc89aac79b
