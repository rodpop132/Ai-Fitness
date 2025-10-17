import { HERO_STATS } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Play, Sparkles } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary/5 via-background to-background px-6 py-16 shadow-glow-strong">
      <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18)_0%,transparent_60%)] sm:block" />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
        <div className="flex-1 space-y-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-background/80 px-4 py-1 text-sm text-primary">
            <Sparkles className="h-4 w-4" />
            Novo: planos com monitorizacao continua
          </span>

          <div className="space-y-4">
            <h1 className="text-4xl font-display font-bold tracking-tight sm:text-5xl lg:text-6xl">
              O teu copiloto digital para nutricao, treino e progresso real.
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              NutriFit AI combina IA conversacional, analise de imagens e dashboards avancados para libertar o teu tempo
              e elevar a experiencia de cada atleta ou paciente.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="gradient-ai text-white shadow-glow hover:shadow-glow-strong">
              <Link to="/chat">Experimentar o chat inteligente</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <Link to="/pricing">
                <Play className="h-4 w-4" />
                Ver planos disponiveis
              </Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Sem cartao de credito - Compliant com RGPD - Integracao facil com Supabase e Stripe
          </p>
        </div>

        <div className="flex-1 space-y-6 rounded-2xl border border-primary/20 bg-card/80 p-6 backdrop-blur">
          <div className="grid gap-6 sm:grid-cols-3">
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-primary/10 bg-background/70 p-4 text-center shadow-sm">
                <p className="text-2xl font-display font-semibold text-primary">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{stat.label}</p>
                <p className="mt-2 text-xs text-muted-foreground/80">{stat.description}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-border/70 bg-gradient-to-r from-primary/10 via-background to-background p-5 text-sm text-muted-foreground">
            NutriFit AI acelera a fase de descoberta, reduz o tempo de resposta e cria planos personalizados a partir de
            inputs reais dos utilizadores. Comeca hoje e acompanha resultados em tempo real.
          </div>
        </div>
      </div>
    </section>
  );
};

