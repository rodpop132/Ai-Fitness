import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-primary/40 bg-gradient-to-br from-primary/15 via-primary/10 to-background p-10 text-center shadow-glow">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.25),transparent_60%)] opacity-80" />
      <div className="relative z-10 mx-auto max-w-3xl space-y-6">
        <h2 className="text-3xl font-display font-bold sm:text-4xl">
          Pronto para automatizar o acompanhamento nutricional e de treino?
        </h2>
        <p className="text-base text-muted-foreground">
          Lança o teu workspace em minutos, integra as ferramentas que já usas e oferece um copiloto inteligente a cada pessoa que
          acompanhas.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg" className="gradient-ai text-white shadow-glow-strong">
            <Link to="/chat">
              Começar agora
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="border-primary/40 bg-background/80">
            <Link to="/pricing">Ver planos completos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

