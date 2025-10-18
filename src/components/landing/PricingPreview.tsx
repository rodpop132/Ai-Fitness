import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { PRICING_FEATURES } from "@/lib/content";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

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
        features: PRICING_FEATURES[plan.tier].map((key) => t(key)),
      })),
    [t],
  );

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-primary/80">
          {t("pricing.title")}
        </span>
        <h2 className="text-3xl font-display font-bold sm:text-4xl">{t("pricing.subtitle")}</h2>
        <p className="mx-auto max-w-2xl text-base text-muted-foreground">{t("cta.subtitle")}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.tier}
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
              {plan.features.map((feature) => (
                <li key={`${plan.tier}-${feature}`} className="flex items-start gap-3">
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
