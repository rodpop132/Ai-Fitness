import { useMemo, useState } from "react";
import { PricingCard } from "@/components/pricing/PricingCard";
import { PRICING_FEATURES } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, ShieldCheck, Zap } from "lucide-react";

type BillingCycle = "monthly" | "yearly";

const PLAN_PRICES = {
  Free: { monthly: "0", yearly: "0" },
  Pro: { monthly: "9.99", yearly: "89.99" },
  Elite: { monthly: "19.99", yearly: "179.99" },
};

const COMPARISON_ROWS: Array<{ label: string; tiers: [string | boolean, string | boolean, string | boolean] }> = [
  { label: "Mensagens diarias com IA", tiers: ["10", "200", "Ilimitadas"] },
  { label: "Analises de imagem diarias", tiers: ["3", "30", "Ilimitadas"] },
  { label: "Exportacao de planos em PDF", tiers: [false, true, true] },
  { label: "Historico completo", tiers: ["7 dias", "Ilimitado", "Ilimitado"] },
  { label: "Integracao com wearables", tiers: [false, true, "Incluso avancado"] },
  { label: "Consultoria mensal", tiers: [false, false, true] },
];

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  const plans = useMemo(
    () => [
      {
        name: "Free",
        price: PLAN_PRICES.Free[billingCycle],
        period: billingCycle === "monthly" ? "mes" : "ano",
        description: "Para validar o potencial da NutriFit AI sem compromisso.",
        features: PRICING_FEATURES.free,
        buttonText: "Comecar gratis",
      },
      {
        name: "Pro",
        price: PLAN_PRICES.Pro[billingCycle],
        period: billingCycle === "monthly" ? "mes" : "ano",
        description: "Perfeito para nutricionistas e personal trainers com carteiras ativas.",
        features: PRICING_FEATURES.pro,
        highlighted: true,
        buttonText: "Escolher plano Pro",
      },
      {
        name: "Elite",
        price: PLAN_PRICES.Elite[billingCycle],
        period: billingCycle === "monthly" ? "mes" : "ano",
        description: "Para equipas e academias que querem automacao total e consultoria dedicada.",
        features: PRICING_FEATURES.elite,
        buttonText: "Falar com vendas",
      },
    ],
    [billingCycle],
  );

  return (
    <div className="bg-background pb-20 pt-10">
      <div className="container mx-auto max-w-6xl space-y-16 px-6">
        <section className="text-center">
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            Precos transparentes
          </Badge>
          <h1 className="mt-6 text-4xl font-display font-bold sm:text-5xl">
            Planos para cada fase do teu projeto
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            Escolhe o plano que acompanha o teu ritmo de crescimento. Todos incluem acesso ao chatbot, planos inteligentes e
            integracoes com Supabase e Stripe.
          </p>

          <div className="mt-8 inline-flex items-center rounded-full border border-primary/30 bg-card/80 p-2 shadow-sm">
            <Button
              size="sm"
              variant={billingCycle === "monthly" ? "default" : "ghost"}
              className={`rounded-full ${billingCycle === "monthly" ? "gradient-ai text-white shadow-glow" : ""}`}
              onClick={() => setBillingCycle("monthly")}
            >
              Mensal
            </Button>
            <Button
              size="sm"
              variant={billingCycle === "yearly" ? "default" : "ghost"}
              className={`rounded-full ${billingCycle === "yearly" ? "gradient-ai text-white shadow-glow" : ""}`}
              onClick={() => setBillingCycle("yearly")}
            >
              Anual <span className="ml-2 text-xs text-accent">Poupa ate 25%</span>
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
              <h3 className="text-lg font-semibold">Upgrade instantaneo</h3>
              <p className="text-sm text-muted-foreground">
                Faz upgrade ou downgrade a qualquer momento com faturacao proporcional. Sem taxas escondidas.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="rounded-2xl bg-primary/10 p-3 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-lg font-semibold">Seguranca e compliance</h3>
              <p className="text-sm text-muted-foreground">
                Todos os planos incluem encriptacao, backups diarios e rotinas alinhadas com RGPD.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="rounded-2xl bg-primary/10 p-3 text-primary">
              <Zap className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-lg font-semibold">Suporte humano</h3>
              <p className="text-sm text-muted-foreground">
                Fala com especialistas em nutricao e fitness para acelerar a implementacao e personalizacao.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6 rounded-3xl border border-border/60 bg-background/60 p-8 shadow-md">
          <h2 className="text-2xl font-display font-bold text-center">Comparativo rapido de funcionalidades</h2>
          <div className="overflow-hidden rounded-2xl border border-border/70">
            <table className="min-w-full divide-y divide-border/60 text-sm">
              <thead className="bg-card/70">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Funcionalidade</th>
                  <th className="px-4 py-3 text-center font-semibold">Free</th>
                  <th className="px-4 py-3 text-center font-semibold">Pro</th>
                  <th className="px-4 py-3 text-center font-semibold">Elite</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 bg-card/50">
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.label}>
                    <td className="px-4 py-3 font-medium text-foreground">{row.label}</td>
                    {row.tiers.map((tier, index) => (
                      <td key={`${row.label}-${index}`} className="px-4 py-3 text-center text-muted-foreground">
                        {typeof tier === "boolean" ? (
                          tier ? (
                            <Check className="mx-auto h-4 w-4 text-primary" />
                          ) : (
                            <span>-</span>
                          )
                        ) : (
                          tier
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

