import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  Check,
  Loader2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wand2,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";
import { useChatPreferences, ChatModel, chatModelLabels } from "@/hooks/useChatPreferences";
import { cn } from "@/lib/utils";

interface ProgressEntry {
  date: string;
  weight_kg?: number;
  body_fat_pct?: number;
  notes?: string;
}

const PLAN_LIMITS: Record<string, { messages: number; images: number }> = {
  free: { messages: 10, images: 3 },
  pro: { messages: 200, images: 30 },
  elite: { messages: 1000, images: 100 },
};

const CHAT_MODEL_CONFIG: Record<
  ChatModel,
  {
    tagline: string;
    bullets: string[];
    chipClass: string;
  }
> = {
  fitai_fast: {
    tagline: "Responde em segundos, perfeito para check-ins rapidos e acompanhamento diario.",
    bullets: [
      "Latencia muito baixa com respostas objetivas",
      "Ideal para mobile e perguntas de rotina",
      "Consumo reduzido de mensagens por sessao",
    ],
    chipClass: "border-emerald-400/60 bg-emerald-400/10 text-emerald-500",
  },
  fitai_detailed: {
    tagline: "Aprofunda analises de nutricao e treino com contexto e planos completos.",
    bullets: [
      "Explicacoes estruturadas passo a passo",
      "Excelente para planos semanais e periodizacao",
      "Sugestoes consistentes com dados anteriores",
    ],
    chipClass: "border-sky-400/60 bg-sky-400/10 text-sky-500",
  },
  fitai_nutri: {
    tagline: "Especialista em alimentacao: macros, avaliacoes de refeicoes e prescricoes personalizadas.",
    bullets: [
      "Calcula macros e calorias automaticamente",
      "Valida restricoes e preferencias nutricionais",
      "Sugere substituicoes inteligentes para menus",
    ],
    chipClass: "border-amber-400/60 bg-amber-400/10 text-amber-500",
  },
};

const Dashboard = () => {
  const { user, status, refreshSession, token } = useAuth();
  const navigate = useNavigate();
  const { model: selectedModel, setModel: setSelectedModel } = useChatPreferences();
  const [progress, setProgress] = useState<ProgressEntry[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      refreshSession().catch(() => undefined);
    }
  }, [status, refreshSession]);

  useEffect(() => {
    if (!token) return;
    const loadProgress = async () => {
      setLoadingProgress(true);
      setError(null);
      try {
        const data = await api.listProgress(token);
        setProgress(data.items || []);
      } catch (err) {
        console.error(err);
        setError("Nao foi possivel carregar o progresso recente.");
      } finally {
        setLoadingProgress(false);
      }
    };
    loadProgress();
  }, [token]);

  const latestEntry = useMemo(() => progress[0], [progress]);

  const planKey = (user?.plan ?? "free").toLowerCase();
  const limits = PLAN_LIMITS[planKey] ?? PLAN_LIMITS.free;

  const usageTiles = useMemo(
    () => [
      {
        id: "messages",
        label: "Mensagens usadas hoje",
        value: user?.dailyMessagesUsed ?? 0,
        limit: limits.messages,
      },
      {
        id: "images",
        label: "Analises de imagem",
        value: user?.dailyImagesUsed ?? 0,
        limit: limits.images,
      },
    ],
    [user, limits.messages, limits.images],
  );

  const backendSnippet = `const response = await fetch(\`\${API_BASE_URL}/chat/\${conversationId}/messages\`, {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${token}\`,
    "Content-Type": "application/json",
    Accept: "text/event-stream",
  },
  body: JSON.stringify({
    content: "Cria um plano de treinos para 5 dias.",
    model: "${selectedModel}"
  }),
});`;

  return (
    <div className="container mx-auto space-y-10 px-6 py-16">
      <section className="grid gap-6 xl:grid-cols-[1.8fr_1fr]">
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/20 via-background to-background p-8 shadow-glow-sm">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.2),transparent_60%)]" />
          <div className="pointer-events-none absolute -right-24 top-10 hidden h-64 w-64 rounded-full bg-primary/10 blur-3xl lg:block" />
          <div className="relative z-10 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="border-primary/40 bg-background/80 text-primary">
                <Sparkles className="mr-1 h-3 w-3" />
                Ola novamente
              </Badge>
              <Badge variant="secondary" className="border border-white/20 bg-white/10 text-foreground">
                Plano {user?.plan?.toUpperCase() ?? "FREE"}
              </Badge>
            </div>
            <h1 className="text-3xl font-display font-semibold md:text-4xl">
              {user?.name ? `Olá, ${user.name}!` : "Bem-vindo de volta!"}
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground">
              Controla o teu espaco de trabalho, escolhe o modelo de IA ideal e acompanha o impacto real nas metricas dos
              teus clientes, tudo a partir desta dashboard.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {usageTiles.map((tile) => (
                <div
                  key={tile.id}
                  className="rounded-2xl border border-white/25 bg-background/85 p-4 shadow-sm backdrop-blur"
                >
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{tile.label}</p>
                  <p className="mt-2 text-3xl font-display font-semibold text-foreground">
                    {tile.value}
                    <span className="ml-1 text-sm font-normal text-muted-foreground">/ {tile.limit}</span>
                  </p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                className="gradient-ai rounded-xl px-6 text-white shadow-glow hover:shadow-glow-strong"
                onClick={() => navigate("/chat")}
              >
                Abrir chat com {chatModelLabels[selectedModel].name}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                className="rounded-xl border border-primary/30"
                onClick={() => navigate("/settings")}
              >
                Personalizar experiencia
              </Button>
              <Button variant="ghost" className="rounded-xl" onClick={() => navigate("/pricing")}>
                Ver planos premium
              </Button>
            </div>
            <div className="flex flex-wrap gap-5 text-xs text-muted-foreground">
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                RGPD-ready e backups diarios.
              </span>
              <span className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                Streaming SSE com selecao de modelo.
              </span>
              <span className="flex items-center gap-2">
                <Wand2 className="h-4 w-4 text-primary" />
                Preferencia sincronizada entre paginas.
              </span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <Card className="border border-border/60 bg-card/80">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <Activity className="h-4 w-4 text-primary" />
                Radar do dia
              </CardTitle>
              <CardDescription>Monitoriza consumo de mensagens e imagens em tempo real.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center justify-between rounded-xl border border-border/60 bg-background/70 p-3">
                <span>Modelo ativo</span>
                <Badge className="rounded-full border border-primary/40 bg-primary/10 text-primary">
                  {chatModelLabels[selectedModel].name}
                </Badge>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border/60 bg-background/70 p-3">
                <span>Limites diarios</span>
                <span>
                  {limits.messages} msg • {limits.images} visoes
                </span>
              </div>
            </CardContent>
          </Card>
          {latestEntry && (
            <Card className="border border-border/60 bg-card/80">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Ultimo registo
                </CardTitle>
                <CardDescription>{new Date(latestEntry.date).toLocaleDateString("pt-PT")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground">
                {typeof latestEntry.weight_kg === "number" && (
                  <p>
                    Peso: <span className="font-medium text-foreground">{latestEntry.weight_kg.toFixed(1)} kg</span>
                  </p>
                )}
                {typeof latestEntry.body_fat_pct === "number" && (
                  <p>
                    Gordura corporal:{" "}
                    <span className="font-medium text-foreground">{latestEntry.body_fat_pct.toFixed(1)}%</span>
                  </p>
                )}
                {latestEntry.notes && <p>Notas: {latestEntry.notes}</p>}
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <Card className="border border-border/70 bg-card/80 shadow-sm">
          <CardHeader>
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle className="text-lg font-display">Modelos de chat</CardTitle>
                <CardDescription>Seleciona o comportamento da IA para novas respostas.</CardDescription>
              </div>
              <Badge variant="outline" className="rounded-full border-primary/40 bg-primary/10 text-primary">
                Preferencia sincronizada
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {Object.entries(CHAT_MODEL_CONFIG).map(([key, config]) => {
                const value = key as ChatModel;
                const isActive = value === selectedModel;
                return (
                  <div
                    key={key}
                    className={cn(
                      "group flex h-full flex-col justify-between rounded-2xl border p-5 transition-all",
                      isActive
                        ? "border-primary/60 bg-primary/5 shadow-glow"
                        : "border-border/60 bg-background/70 hover:border-primary/40 hover:bg-background/80",
                    )}
                  >
                    <div className="space-y-3">
                      <Badge
                        variant="outline"
                        className={cn(
                          "w-fit rounded-full border px-3 py-1 text-xs font-semibold",
                          config.chipClass,
                        )}
                      >
                        {chatModelLabels[value].name}
                      </Badge>
                      <p className="text-sm text-muted-foreground">{config.tagline}</p>
                      <ul className="space-y-2 text-xs text-muted-foreground">
                        {config.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-2">
                            <Check className="mt-0.5 h-3 w-3 text-primary" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button
                      variant={isActive ? "default" : "outline"}
                      className={cn(
                        "mt-6 w-full rounded-xl transition",
                        isActive ? "gradient-ai text-white shadow-glow" : "border-primary/40",
                      )}
                      onClick={() => setSelectedModel(value)}
                    >
                      {isActive ? "Modelo ativo" : "Usar este modelo"}
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/70 bg-card/80 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-display">Integracao backend</CardTitle>
            <CardDescription>
              Passa o campo <code>model</code> para o NutriFit AI responder com o modelo escolhido.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Exemplo de chamada com <strong>{chatModelLabels[selectedModel].name}</strong>:
            </p>
            <pre className="overflow-x-auto rounded-2xl border border-border/70 bg-background/80 p-4 text-xs text-muted-foreground">
              {backendSnippet}
            </pre>
            <p className="text-xs text-muted-foreground">
              O backend devolve streaming SSE. Fecha a ligacao quando receberes o evento <code>end</code>.
            </p>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="border border-border/70 bg-card/80 shadow-sm">
          <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-lg font-display">Historico de progresso</CardTitle>
              <CardDescription>Entradas registadas via chatbot ou integracoes externas.</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="rounded-full" onClick={() => navigate("/chat")}>
              Atualizar via chat
            </Button>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {loadingProgress ? (
              <div className="flex h-32 items-center justify-center text-muted-foreground">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                A carregar progresso...
              </div>
            ) : progress.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 py-10 text-center text-sm text-muted-foreground">
                <Sparkles className="h-5 w-5 text-primary" />
                <p>Ainda nao existem registos. Pede ao chatbot para guardar o teu primeiro progresso.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Peso (kg)</TableHead>
                    <TableHead>Gordura (%)</TableHead>
                    <TableHead>Notas</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {progress.slice(0, 10).map((entry) => (
                    <TableRow key={entry.date}>
                      <TableCell>{new Date(entry.date).toLocaleDateString("pt-PT")}</TableCell>
                      <TableCell>{entry.weight_kg ? entry.weight_kg.toFixed(1) : "-"}</TableCell>
                      <TableCell>{entry.body_fat_pct ? entry.body_fat_pct.toFixed(1) : "-"}</TableCell>
                      <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                        {entry.notes || "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Dashboard;
