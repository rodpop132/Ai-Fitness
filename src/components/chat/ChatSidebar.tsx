import { Plus, MessageSquare, Settings, CreditCard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface ChatSidebarProps {
  conversations: Array<{ id: string; title: string; date: string }>;
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
