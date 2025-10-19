import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { WORKFLOW_STEPS } from "@/lib/content";
import { ArrowRight } from "lucide-react";

export const WorkflowSection = () => {
  const { t } = useTranslation();

  const steps = useMemo(
    () =>
      WORKFLOW_STEPS.map(({ key, step }) => ({
        key,
        step,
        title: t(`workflow.steps.${key}.title`),
        description: t(`workflow.steps.${key}.description`),
      })),
    [t],
  );

  return (
    <section
      id="workflow"
      className="relative overflow-hidden rounded-[32px] border border-border/60 bg-gradient-to-br from-card/80 via-card to-card/90 p-8 shadow-lg md:p-12"
    >
      <div className="pointer-events-none absolute -left-16 top-8 h-44 w-44 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="inline-flex items-center rounded-full border border-primary/50 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-primary">
            {t("header.badge")}
          </span>
          <h2 className="mt-4 text-3xl font-display font-bold sm:text-4xl">{t("workflow.title")}</h2>
        </div>
        <p className="max-w-xl text-sm text-muted-foreground md:text-base">{t("workflow.subtitle")}</p>
      </div>

      <div className="relative grid gap-6 md:grid-cols-3">
        <span className="pointer-events-none absolute left-[16%] top-12 hidden h-0.5 w-2/3 bg-gradient-to-r from-primary/10 via-primary/60 to-primary/10 md:block" />
        {steps.map((item, index) => (
          <div
            key={item.key}
            className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-3xl border border-border/60 bg-background/90 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-lg font-display font-semibold text-primary transition group-hover:bg-primary/20">
              {item.step}
            </span>
            <div>
              <h3 className="text-xl font-display font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{item.description}</p>
            </div>
            {index < steps.length - 1 && (
              <ArrowRight className="absolute right-6 top-1/2 hidden h-8 w-8 -translate-y-1/2 text-primary/50 md:block" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
