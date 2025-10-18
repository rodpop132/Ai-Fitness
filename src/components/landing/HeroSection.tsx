import { HERO_STATS } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Activity, Play, ShieldCheck, Sparkles, Zap } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary/5 via-background to-background px-6 py-16 shadow-glow-strong">
      <div className="pointer-events-none absolute -left-20 top-10 hidden h-60 w-60 animate-float-slow rounded-full bg-primary/10 blur-3xl lg:block" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 animate-pulse-soft rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.18),transparent_60%)]" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
        <div className="flex-1 space-y-8">
          <span className="inline-flex animate-fade-in items-center gap-2 rounded-full border border-primary/40 bg-background/80 px-4 py-1 text-sm text-primary shadow-sm">
            <Sparkles className="h-4 w-4" />
            Novo: monitorizacao continua e integraçao Stripe
          </span>

          <div className="space-y-4">
            <h1 className="animate-slide-up text-4xl font-display font-bold tracking-tight sm:text-5xl lg:text-6xl">
              O copiloto digital que transforma nutricao e treino em experiencias premium.
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Combina IA conversacional, analise de imagens e dashboards interativos para entregar planos personalizados,
              gerar PDFs e acompanhar progresso em tempo real — tudo num unico hub.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              asChild
              size="lg"
              className="gradient-ai text-white shadow-glow transition-all duration-200 hover:-translate-y-0.5 hover:shadow-glow-strong"
            >
              <Link to="/chat">
                Experimentar o chat inteligente
                <Zap className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 rounded-xl border-primary/40 bg-background/70 transition hover:border-primary/60 hover:bg-background"
            >
              <Link to="/pricing">
                <Play className="h-4 w-4" />
                Ver planos disponiveis
              </Link>
            </Button>
          </div>

          <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background/70 p-3 backdrop-blur">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span>RGPD-ready, single sign-on e backups diarios incluidos.</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background/70 p-3 backdrop-blur">
              <Activity className="h-5 w-5 text-primary" />
              <span>Workflows automáticos entre Supabase, Stripe e planos PDF.</span>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-6 rounded-2xl border border-primary/20 bg-card/80 p-6 backdrop-blur">
          <div className="grid gap-6 sm:grid-cols-3">
            {HERO_STATS.map((stat, index) => (
              <div
                key={stat.label}
                className="animate-float-slow rounded-xl border border-primary/10 bg-background/70 p-4 text-center shadow-sm"
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                <p className="text-2xl font-display font-semibold text-primary">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{stat.label}</p>
                <p className="mt-2 text-xs text-muted-foreground/80">{stat.description}</p>
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-xl border border-border/70 bg-gradient-to-r from-primary/10 via-background to-background p-5 text-sm text-muted-foreground">
            <div className="animate-shine bg-[linear-gradient(120deg,transparent,rgba(16,185,129,0.16),transparent)] bg-[length:250%_250%]">
              NutriFit AI acelera a descoberta de necessidades, reduz o tempo de resposta e cria planos altamente
              personalizados. Liga-te via SSE, escolhe o modelo ideal e acompanha resultados sem sair do browser.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
