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

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  const plans = useMemo(
    () => [
      {
        name: "Free",
        price: PLAN_PRICES.Free[billingCycle],
        period: billingCycle === "monthly" ? "mês" : "ano",
        description: "Para validar o potencial da NutriFit AI sem compromisso.",
        features: PRICING_FEATURES.free,
        buttonText: "Começar grátis",
      },
      {
        name: "Pro",
        price: PLAN_PRICES.Pro[billingCycle],
        period: billingCycle === "monthly" ? "mês" : "ano",
        description: "Perfeito para nutricionistas e personal trainers com carteiras ativas.",
        features: PRICING_FEATURES.pro,
        highlighted: true,
        buttonText: "Escolher plano Pro",
      },
      {
        name: "Elite",
        price: PLAN_PRICES.Elite[billingCycle],
        period: billingCycle === "monthly" ? "mês" : "ano",
        description: "Para equipas e academias que querem automação total e consultoria dedicada.",
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
            Preços transparentes
          </Badge>
          <h1 className="mt-6 text-4xl font-display font-bold sm:text-5xl">Planos para cada fase do teu projeto</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            Escolhe o plano que acompanha o teu ritmo de crescimento. Todos incluem acesso ao chatbot, planos inteligentes e
            integrações com Supabase e Stripe.
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
              Anual <span className="ml-2 text-xs text-accent">Poupa até 25%</span>
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
              <h3 className="text-lg font-semibold">Upgrade instantâneo</h3>
              <p className="text-sm text-muted-foreground">
                Faz upgrade ou downgrade a qualquer momento com faturação proporcional. Sem taxas escondidas.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="rounded-2xl bg-primary/10 p-3 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-lg font-semibold">Segurança e compliance</h3>
              <p className="text-sm text-muted-foreground">
                Todos os planos incluem encriptação, backups diários e rotinas alinhadas com RGPD.
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
                Fala com especialistas em nutrição e fitness para acelerar a implementação e personalização.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6 rounded-3xl border border-border/60 bg-background/60 p-8 shadow-md">
          <h2 className="text-2xl font-display font-bold text-center">Comparativo rápido de funcionalidades</h2>
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
                {[
                  { label: "Mensagens diárias com IA", values: ["10", "200", "Ilimitadas"] },
                  { label: "Análises de imagem diárias", values: ["3", "30", "Ilimitadas"] },
                  { label: "Exportação de planos em PDF", values: ["—", "✔", "✔"] },
                  { label: "Histórico completo", values: ["7 dias", "Ilimitado", "Ilimitado"] },
                  { label: "Integração com wearables", values: ["—", "✔", "✔ Avançado"] },
                  { label: "Consultoria mensal", values: ["—", "—", "✔"] },
                ].map((row) => (
                  <tr key={row.label}>
                    <td className="px-4 py-3 font-medium text-foreground">{row.label}</td>
                    {row.values.map((value, index) => (
                      <td key={index} className="px-4 py-3 text-center text-muted-foreground">
                        {value === "✔" ? <Check className="mx-auto h-4 w-4 text-primary" /> : value}
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

