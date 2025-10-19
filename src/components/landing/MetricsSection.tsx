import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { METRIC_CARDS } from "@/lib/content";
import { GaugeCircle, Server, ShieldCheck } from "lucide-react";

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
    <section className="space-y-8">
      <div className="space-y-2 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.4em] text-primary/70">
          {t("header.badge")}
        </span>
        <h2 className="text-3xl font-display font-bold sm:text-4xl">{t("metrics.title")}</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {metrics.map((metric) => {
          const Icon = icons[metric.index];

          return (
            <article
              key={metric.key}
              className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-3xl border border-border/60 bg-card/90 p-6 shadow-md transition duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-glow"
              style={{ animationDelay: `${metric.index * 0.12}s` }}
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent transition opacity-60 group-hover:opacity-100" />
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary/20">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-semibold">{metric.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{metric.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
};
