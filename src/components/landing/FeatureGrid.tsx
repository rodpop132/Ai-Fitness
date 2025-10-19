import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FEATURE_CARDS } from "@/lib/content";
import { ClipboardCheck, Dumbbell, Eye, Sparkles, TrendingUp } from "lucide-react";

const iconMap = {
  Plan: ClipboardCheck,
  Strong: Dumbbell,
  Vision: Eye,
  Growth: TrendingUp,
} as const;

export const FeatureGrid = () => {
  const { t } = useTranslation();

  const cards = useMemo(
    () =>
      FEATURE_CARDS.map(({ key, icon }) => ({
        key,
        icon,
        title: t(`features.cards.${key}.title`),
        description: t(`features.cards.${key}.description`),
      })),
    [t],
  );

  return (
    <section id="features" className="space-y-6">
      <div className="space-y-3 text-center">
        <span className="text-sm font-semibold uppercase tracking-[0.4em] text-primary/80">
          {t("header.badge")}
        </span>
        <h2 className="text-3xl font-display font-bold sm:text-4xl">{t("features.title")}</h2>
        <p className="mx-auto max-w-3xl text-base text-muted-foreground">{t("features.subtitle")}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
        {cards.map((feature, index) => {
          const Icon = iconMap[feature.icon as keyof typeof iconMap] ?? Sparkles;

          return (
            <article
              key={feature.key}
              className="group relative h-full overflow-hidden rounded-3xl border border-border/60 bg-card/90 p-7 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-glow"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary/40 via-primary to-primary/40 opacity-60 transition group-hover:opacity-100" />
              <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:scale-[1.08] group-hover:bg-primary/20">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="text-xl font-display font-semibold">{feature.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{feature.description}</p>
              <div className="mt-6 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-primary/70 transition group-hover:text-primary">
                {t("common.actions.learnMore")}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
