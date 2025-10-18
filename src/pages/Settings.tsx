import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { useChatPreferences, ChatModel, chatModelLabels } from "@/hooks/useChatPreferences";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { cn } from "@/lib/utils";
import { Check, LayoutDashboard, MessageSquare, Settings2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MODEL_OPTIONS: Array<{
  value: ChatModel;
  tagline: string;
  chipClass: string;
  bullets: string[];
}> = [
  {
    value: "fitai_fast",
    tagline: "Mensagens imediatas para check-ins diarios.",
    chipClass: "border-emerald-400/60 bg-emerald-400/10 text-emerald-500",
    bullets: ["Latencia baixa", "Sugestoes diretas", "Uso reduzido de tokens"],
  },
  {
    value: "fitai_detailed",
    tagline: "Planos completos com explicacoes profundas.",
    chipClass: "border-sky-400/60 bg-sky-400/10 text-sky-500",
    bullets: ["Respostas estruturadas", "Contexto nutricional e de treino", "Ideal para planos semanais"],
  },
  {
    value: "fitai_nutri",
    tagline: "Especialista em nutricao e macros personalizadas.",
    chipClass: "border-amber-400/60 bg-amber-400/10 text-amber-500",
    bullets: ["Analisador de refeicoes", "Recomenda substituicoes", "Foco em macros e calorias"],
  },
];

const THEME_OPTIONS = [
  { value: "light", label: "Claro" },
  { value: "dark", label: "Escuro" },
  { value: "system", label: "Sistema" },
] as const;

const Settings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { model: selectedModel, setModel: setSelectedModel } = useChatPreferences();
  const { preferences, updatePreference, resetPreferences } = useUserPreferences();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const currentModelLabel = useMemo(() => chatModelLabels[selectedModel].name, [selectedModel]);

  return (
    <div className="container mx-auto max-w-5xl space-y-10 px-6 py-16">
      <header className="space-y-3">
        <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary">
          <Sparkles className="mr-2 h-4 w-4" />
          Espaco pessoal
        </Badge>
        <h1 className="text-3xl font-display font-semibold">Preferencias e configuracoes</h1>
        <p className="max-w-3xl text-sm text-muted-foreground">
          Ajusta o comportamento do chatbot, sincroniza as tuas preferencias e controla o aspeto visual da plataforma. As
          mudancas aplicam-se imediatamente ao dashboard e ao chat.
        </p>
      </header>

      <Card className="border border-border/70 bg-card/80 shadow-sm">
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary/90 text-primary-foreground">
                {user?.email?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl font-display">{user?.name || user?.email || "Conta NutriFit"}</CardTitle>
              <CardDescription>{user?.email}</CardDescription>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="rounded-full border border-primary/30 bg-primary/10 text-primary">
              Plano {user?.plan?.toUpperCase() ?? "FREE"}
            </Badge>
            <Badge variant="outline" className="rounded-full border border-primary/30">
              Modelo: {currentModelLabel}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">Tema da interface:</span>
            {mounted ? (
              <div className="flex flex-wrap gap-2">
                {THEME_OPTIONS.map((option) => {
                  const isActive = theme === option.value || (!theme && option.value === "system");
                  return (
                    <Button
                      key={option.value}
                      variant={isActive ? "default" : "outline"}
                      className={cn(
                        "rounded-full px-4 text-sm",
                        isActive ? "gradient-ai text-white shadow-glow" : "border border-border/70",
                      )}
                      onClick={() => setTheme(option.value)}
                    >
                      {option.label}
                    </Button>
                  );
                })}
              </div>
            ) : (
              <div className="h-9 w-36 animate-pulse rounded-full bg-muted/40" />
            )}
          </div>
          <Separator />
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="gap-2 rounded-full" onClick={() => navigate("/dashboard")}>
              <LayoutDashboard className="h-4 w-4" />
              Abrir dashboard
            </Button>
            <Button variant="outline" size="sm" className="gap-2 rounded-full" onClick={() => navigate("/chat")}>
              <MessageSquare className="h-4 w-4" />
              Ir para o chat
            </Button>
            <Button variant="outline" size="sm" className="gap-2 rounded-full" onClick={() => navigate("/pricing")}>
              <Settings2 className="h-4 w-4" />
              Gerir plano
            </Button>
          </div>
        </CardContent>
      </Card>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="border border-border/70 bg-card/80 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-display">Modelo de chat</CardTitle>
            <CardDescription>A escolha e partilhada com o dashboard e usada nas proximas respostas.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {MODEL_OPTIONS.map((option) => {
                const isActive = option.value === selectedModel;
                return (
                  <button
                    key={option.value}
                    onClick={() => setSelectedModel(option.value)}
                    className={cn(
                      "w-full rounded-2xl border p-4 text-left transition-all",
                      isActive
                        ? "border-primary/60 bg-primary/5 shadow-glow"
                        : "border-border/60 bg-background/70 hover:border-primary/40 hover:bg-background/80",
                    )}
                    type="button"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <Badge
                        variant="outline"
                        className={cn("rounded-full border px-3 py-1 text-xs font-semibold", option.chipClass)}
                      >
                        {chatModelLabels[option.value].name}
                      </Badge>
                      {isActive && <Check className="h-4 w-4 text-primary" />}
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{option.tagline}</p>
                    <ul className="mt-3 grid gap-2 text-xs text-muted-foreground">
                      {option.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/70 bg-card/80 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-display">Preferencias do chat</CardTitle>
            <CardDescription>Define como o chat se comporta localmente no teu navegador.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between gap-4 rounded-2xl border border-border/60 bg-background/70 p-4">
              <div>
                <p className="text-sm font-medium text-foreground">Sugestoes inteligentes</p>
                <p className="text-xs text-muted-foreground">Mostra frases prontas quando abres uma nova conversa.</p>
              </div>
              <Switch
                checked={preferences.showSuggestions}
                onCheckedChange={(checked) => updatePreference("showSuggestions", checked)}
              />
            </div>
            <div className="flex items-center justify-between gap-4 rounded-2xl border border-border/60 bg-background/70 p-4">
              <div>
                <p className="text-sm font-medium text-foreground">Auto-scroll nas respostas</p>
                <p className="text-xs text-muted-foreground">
                  Desativa se preferires controlar manualmente o posicionamento da conversa.
                </p>
              </div>
              <Switch
                checked={preferences.autoScrollOnReply}
                onCheckedChange={(checked) => updatePreference("autoScrollOnReply", checked)}
              />
            </div>
            <Separator />
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-muted-foreground">Estas definicoes guardam-se localmente neste dispositivo.</p>
              <Button variant="ghost" size="sm" className="rounded-full text-xs" onClick={resetPreferences}>
                Repor padrao
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Settings;
