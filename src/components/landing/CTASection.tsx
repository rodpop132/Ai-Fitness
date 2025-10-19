import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

export const CTASection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden rounded-[36px] border border-primary/40 bg-gradient-to-br from-primary/18 via-primary/10 to-background p-12 text-center shadow-glow">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.25),transparent_60%)] opacity-80" />
      <div className="pointer-events-none absolute -left-24 top-10 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-48 w-48 rounded-full bg-primary/30 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-3xl space-y-6">
        <span className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/40 bg-background/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          {t("common.actions.start")}
        </span>
        <h2 className="text-3xl font-display font-bold sm:text-4xl">{t("cta.title")}</h2>
        <p className="text-base text-muted-foreground">{t("cta.subtitle")}</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg" className="gradient-ai text-white shadow-glow-strong">
            <Link to="/chat">
              {t("cta.primary")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="border-primary/40 bg-background/80">
            <Link to="/pricing">{t("cta.secondary")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
