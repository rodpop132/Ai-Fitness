import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { METRIC_CARDS } from "@/lib/content";
import { ShieldCheck, Server, GaugeCircle } from "lucide-react";

const icons = [ShieldCheck, Server, GaugeCircle];

export const MetricsSection = () => {
  const { t } = useTranslation();

  const metrics = useMemo(
    () =>
      METRIC_CARDS.map(({ key }, index) => ({
        key,
        index,
        title: t(`metrics.cards.${key}.title`),
        description: t(`metrics.cards.${key}.description`),
      })),
    [t],
  );

  return (
    <section className="grid gap-6 lg:grid-cols-3">
      {metrics.map((metric) => {
        const Icon = icons[metric.index];
        return (
          <article
            key={metric.key}
            className="rounded-3xl border border-border/70 bg-gradient-to-br from-background via-card/90 to-background p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="text-xl font-semibold">{metric.title}</h3>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{metric.description}</p>
          </article>
        );
      })}
    </section>
  );
};
