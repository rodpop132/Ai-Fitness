import { PRICING_FEATURES } from "@/lib/content";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const planMeta = [
  { name: "Free", price: "0EUR", period: "mes", cta: "Comecar gratis", tier: "free" as const },
  { name: "Pro", price: "9,99EUR", period: "mes", cta: "Escolher Pro", tier: "pro" as const, highlight: true },
  { name: "Elite", price: "19,99EUR", period: "mes", cta: "Explorar Elite", tier: "elite" as const },
];

export const PricingPreview = () => {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-primary/80">Planos simples</span>
        <h2 className="text-3xl font-display font-bold sm:text-4xl">Escala com o plano certo para a tua equipa</h2>
        <p className="mx-auto max-w-2xl text-base text-muted-foreground">
          Comeca gratuito e ativa funcionalidades avancadas quando precisares. Sem taxas escondidas, cancela quando quiseres.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {planMeta.map((plan) => (
          <article
            key={plan.name}
            className={`flex h-full flex-col rounded-3xl border p-6 transition hover:-translate-y-1 hover:shadow-lg ${
              plan.highlight
                ? "border-primary/50 bg-gradient-to-b from-primary/15 via-card to-card"
                : "border-border/70 bg-card/80"
            }`}
          >
            <div className="space-y-2 text-center">
              <p className="text-xs uppercase tracking-widest text-primary/70">{plan.name}</p>
              <p className="text-4xl font-display font-bold">{plan.price}</p>
              <p className="text-xs text-muted-foreground">/{plan.period}</p>
            </div>

            <ul className="mt-6 flex flex-1 flex-col gap-3 text-sm text-muted-foreground">
              {PRICING_FEATURES[plan.tier].map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Check className="h-3 w-3" />
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button asChild className={`mt-8 ${plan.highlight ? "gradient-ai text-white shadow-glow" : ""}`}>
              <Link to="/pricing">{plan.cta}</Link>
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
};

