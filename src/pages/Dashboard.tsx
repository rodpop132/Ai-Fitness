import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Activity, Sparkles, ShieldCheck } from "lucide-react";

const Dashboard = () => {
  const { user, status, refreshSession } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "authenticated") {
      refreshSession().catch(() => undefined);
    }
  }, [status, refreshSession]);

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="animate-fade-in-up border border-border/70 bg-card/80 shadow-glow-sm">
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-display">Ola, {user?.name || user?.email}</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Estas no plano <strong>{user?.plan.toUpperCase()}</strong>. Usa o chatbot para gerar planos e analisar
                refeicoes.
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
              <Button className="rounded-xl bg-primary text-primary-foreground hover:shadow-glow" onClick={() => navigate("/chat")}>
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

