import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { PricingCard } from "@/components/pricing/PricingCard";
import { PRICING_FEATURES } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, ShieldCheck, Zap } from "lucide-react";

type BillingCycle = "monthly" | "yearly";

const PLAN_PRICES: Record<"free" | "pro" | "elite", Record<BillingCycle, string>> = {
  free: { monthly: "0", yearly: "0" },
  pro: { monthly: "9.99", yearly: "89.99" },
  elite: { monthly: "19.99", yearly: "179.99" },
};

const PLAN_CONFIG = [
  { tier: "free" as const, highlight: false },
  { tier: "pro" as const, highlight: true },
  { tier: "elite" as const, highlight: false },
];

const COMPARISON_ROWS = [
  {
    labelKey: "pricing.comparison.rows.messages",
    tiers: ["pricing.comparison.values.messages.0", "pricing.comparison.values.messages.1", "pricing.comparison.values.messages.2"],
  },
  {
    labelKey: "pricing.comparison.rows.vision",
    tiers: ["pricing.comparison.values.vision.0", "pricing.comparison.values.vision.1", "pricing.comparison.values.vision.2"],
  },
  {
    labelKey: "pricing.comparison.rows.pdf",
    tiers: [false, true, true] as Array<string | boolean>,
  },
  {
    labelKey: "pricing.comparison.rows.history",
    tiers: ["pricing.comparison.values.history.0", "pricing.comparison.values.history.1", "pricing.comparison.values.history.2"],
  },
  {
    labelKey: "pricing.comparison.rows.wearables",
    tiers: [false, true, "pricing.comparison.values.wearables.2"] as Array<string | boolean>,
  },
  {
    labelKey: "pricing.comparison.rows.consulting",
    tiers: [false, false, true],
  },
];

const Pricing = () => {
  const { t } = useTranslation();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  const plans = useMemo(
    () =>
      PLAN_CONFIG.map(({ tier, highlight }) => ({
        name: t(`pricing.cards.${tier}.title`),
        price: PLAN_PRICES[tier][billingCycle],
        period: billingCycle === "monthly" ? t("pricing.billing.monthly") : t("pricing.billing.yearly"),
        description: t(`pricing.cards.${tier}.description`),
        features: PRICING_FEATURES[tier].map((key) => t(key)),
        highlighted: highlight,
        buttonText: t(`pricing.cards.${tier}.button`),
      })),
    [billingCycle, t],
  );

  return (
    <div className="bg-background pb-20 pt-10">
      <div className="container mx-auto max-w-6xl space-y-16 px-6">
        <section className="text-center">
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {t("pricing.badge")}
          </Badge>
          <h1 className="mt-6 text-4xl font-display font-bold sm:text-5xl">
            {t("pricing.title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            {t("pricing.subtitle")}
          </p>

          <div className="mt-8 inline-flex items-center rounded-full border border-primary/30 bg-card/80 p-2 shadow-sm">
            <Button
              size="sm"
              variant={billingCycle === "monthly" ? "default" : "ghost"}
              className={`rounded-full ${billingCycle === "monthly" ? "gradient-ai text-white shadow-glow" : ""}`}
              onClick={() => setBillingCycle("monthly")}
            >
              {t("pricing.billing.monthly")}
            </Button>
            <Button
              size="sm"
              variant={billingCycle === "yearly" ? "default" : "ghost"}
              className={`rounded-full ${billingCycle === "yearly" ? "gradient-ai text-white shadow-glow" : ""}`}
              onClick={() => setBillingCycle("yearly")}
            >
              {t("pricing.billing.yearly")}{" "}
              <span className="ml-2 text-xs text-accent">{t("pricing.billing.save")}</span>
            </Button>
          </div>
        </section>

        <section className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard
              key={plan.name}
              name={plan.name}
              price={plan.price}
              period={plan.period}
              description={plan.description}
              features={plan.features}
              highlighted={plan.highlighted}
              buttonText={plan.buttonText}
              onSelect={() => console.log(`Selecionou ${plan.name}`)}
            />
          ))}
        </section>

        <section className="grid gap-6 rounded-3xl border border-border/60 bg-card/70 p-8 shadow-md lg:grid-cols-3">
          <div className="flex items-start gap-4">
            <span className="rounded-2xl bg-primary/10 p-3 text-primary">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-lg font-semibold">{t("pricing.highlights.instant.title")}</h3>
              <p className="text-sm text-muted-foreground">{t("pricing.highlights.instant.description")}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="rounded-2xl bg-primary/10 p-3 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-lg font-semibold">{t("pricing.highlights.security.title")}</h3>
              <p className="text-sm text-muted-foreground">{t("pricing.highlights.security.description")}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="rounded-2xl bg-primary/10 p-3 text-primary">
              <Zap className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-lg font-semibold">{t("pricing.highlights.support.title")}</h3>
              <p className="text-sm text-muted-foreground">{t("pricing.highlights.support.description")}</p>
            </div>
          </div>
        </section>

        <section className="space-y-6 rounded-3xl border border-border/60 bg-background/60 p-8 shadow-md">
          <h2 className="text-2xl font-display font-bold text-center">{t("pricing.comparison.title")}</h2>
          <div className="overflow-hidden rounded-2xl border border-border/70">
            <table className="min-w-full divide-y divide-border/60 text-sm">
              <thead className="bg-card/70">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">{t("pricing.comparison.rows.featureHeader")}</th>
                  {plans.map((plan) => (
                    <th key={`head-${plan.name}`} className="px-4 py-3 text-center font-semibold">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 bg-card/50">
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.labelKey}>
                    <td className="px-4 py-3 font-medium text-foreground">{t(row.labelKey)}</td>
                    {row.tiers.map((tier, index) => (
                      <td key={`${row.labelKey}-${index}`} className="px-4 py-3 text-center text-muted-foreground">
                        {typeof tier === "boolean" ? (
                          tier ? (
                            <Check className="mx-auto h-4 w-4 text-primary" />
                          ) : (
                            <span>-</span>
                          )
                        ) : (
                          t(tier)
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Pricing;
