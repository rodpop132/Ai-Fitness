import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { PRICING_FEATURES } from "@/lib/content";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";

const PLAN_CONFIG = [
  { tier: "free" as const, highlight: false },
  { tier: "pro" as const, highlight: true },
  { tier: "elite" as const, highlight: false },
];

export const PricingPreview = () => {
  const { t } = useTranslation();

  const plans = useMemo(
    () =>
      PLAN_CONFIG.map((plan) => ({
        ...plan,
        name: t(`pricing.cards.${plan.tier}.title`),
        price: t(`pricing.cards.${plan.tier}.price`),
        period: t(`pricing.cards.${plan.tier}.period`),
        cta: t(`pricing.cards.${plan.tier}.button`),
        description: t(`pricing.cards.${plan.tier}.description`),
        features: PRICING_FEATURES[plan.tier].map((key) => t(key)),
      })),
    [t],
  );

  return (
    <section className="space-y-8">
      <div className="space-y-3 text-center">
        <span className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          {t("pricing.badge")}
        </span>
        <h2 className="text-3xl font-display font-bold sm:text-4xl">{t("pricing.title")}</h2>
        <p className="mx-auto max-w-2xl text-base text-muted-foreground">{t("pricing.subtitle")}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.tier}
            className={`relative flex h-full flex-col gap-6 overflow-hidden rounded-3xl border p-8 transition duration-300 hover:-translate-y-2 hover:shadow-xl ${
              plan.highlight
                ? "border-primary/50 bg-gradient-to-b from-primary/20 via-card to-card shadow-glow"
                : "border-border/60 bg-card/90"
            }`}
          >
            {plan.highlight && (
              <span className="absolute right-4 top-4 rounded-full border border-primary/50 bg-primary/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.4em] text-primary-foreground/80">
                {t("pricing.billing.save")}
              </span>
            )}

            <div className="space-y-2 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">{plan.name}</p>
              <p className="text-4xl font-display font-bold">{plan.price}</p>
              <p className="text-xs text-muted-foreground">/{plan.period}</p>
              <p className="text-xs text-muted-foreground">{plan.description}</p>
            </div>

            <ul className="flex flex-1 flex-col gap-3 text-sm text-muted-foreground">
              {plan.features.map((feature) => (
                <li key={`${plan.tier}-${feature}`} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Check className="h-3 w-3" />
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              asChild
              className={`w-full ${plan.highlight ? "gradient-ai text-white shadow-glow-strong hover:shadow-glow-strong" : ""}`}
              variant={plan.highlight ? "default" : "secondary"}
            >
              <Link to="/pricing">{plan.cta}</Link>
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
};
