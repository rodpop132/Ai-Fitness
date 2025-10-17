import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowRight, Activity, Sparkles, ShieldCheck, TrendingUp, Loader2 } from "lucide-react";
import { api } from "@/lib/api";

interface ProgressEntry {
  date: string;
  weight_kg?: number;
  body_fat_pct?: number;
  notes?: string;
}

const Dashboard = () => {
  const { user, status, refreshSession, token } = useAuth();
  const navigate = useNavigate();
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

  return (
    <div className="container mx-auto space-y-8 px-6 py-16">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="animate-fade-in-up border border-border/70 bg-card/80 shadow-glow-sm">
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-display">Ola, {user?.name || user?.email}</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Estas no plano <strong>{user?.plan.toUpperCase()}</strong>. Usa o chatbot para gerar planos e analisar refeicoes.
              </p>
            </div>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
              <Activity className="h-6 w-6" />
            </span>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-border/70 bg-background/80 p-4">
                <p className="text-sm text-muted-foreground">Mensagens usadas hoje</p>
                <p className="mt-2 text-3xl font-display font-semibold">
                  {user?.dailyMessagesUsed ?? 0}
                  <span className="text-base font-normal text-muted-foreground"> / 200</span>
                </p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/80 p-4">
                <p className="text-sm text-muted-foreground">Analises de imagem hoje</p>
                <p className="mt-2 text-3xl font-display font-semibold">
                  {user?.dailyImagesUsed ?? 0}
                  <span className="text-base font-normal text-muted-foreground"> / 30</span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button className="rounded-xl bg-primary text-primary-foreground hover:shadow-glow" onClick={() => navigate("/chat")}
              >
                Abrir chatbot
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="rounded-xl" onClick={() => navigate("/pricing")}>
                Ver planos premium
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="animate-fade-in-up border border-border/70 bg-card/80">
            <CardContent className="flex gap-3 p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold">Gera planos com IA</p>
                <p className="text-sm text-muted-foreground">
                  Cria conversas tematicas (nutricao, treino, visao) e recebe respostas em tempo real com streaming.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in-up border border-border/70 bg-card/80">
            <CardContent className="flex gap-3 p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold">Upload seguro</p>
                <p className="text-sm text-muted-foreground">
                  Usa upload seguro para obter analises de refeicoes e rotulos com IA de visao.
                </p>
              </div>
            </CardContent>
          </Card>

          {latestEntry && (
            <Card className="animate-fade-in-up border border-border/70 bg-card/80">
              <CardHeader className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-medium text-muted-foreground">Ultimo progresso registado</CardTitle>
                  <CardDescription>{new Date(latestEntry.date).toLocaleDateString("pt-PT")}</CardDescription>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <TrendingUp className="h-5 w-5" />
                </span>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground">
                {typeof latestEntry.weight_kg === "number" && (
                  <p>
                    Peso: <span className="font-medium text-foreground">{latestEntry.weight_kg.toFixed(1)} kg</span>
                  </p>
                )}
                {typeof latestEntry.body_fat_pct === "number" && (
                  <p>
                    Gordura corporal: <span className="font-medium text-foreground">{latestEntry.body_fat_pct.toFixed(1)}%</span>
                  </p>
                )}
                {latestEntry.notes && <p>Notas: {latestEntry.notes}</p>}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="border border-border/70 bg-card/80 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-display">Historico de progresso</CardTitle>
          <CardDescription>Entradas mais recentes fornecidas pelo utilizador</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {loadingProgress ? (
            <div className="flex h-32 items-center justify-center text-muted-foreground">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> A carregar progresso...
            </div>
          ) : progress.length === 0 ? (
            <p className="text-sm text-muted-foreground">Sem registos de progresso ainda. Adiciona um diretamente pelo chatbot.</p>
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
                    <TableCell className="max-w-xs truncate text-sm text-muted-foreground">{entry.notes || "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

