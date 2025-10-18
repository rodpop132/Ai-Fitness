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
    <section id="workflow" className="rounded-3xl border border-border/60 bg-card/70 p-8 shadow-md md:p-12">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="text-sm font-semibold uppercase tracking-widest text-primary/80">
            {t("header.badge")}
          </span>
          <h2 className="text-3xl font-display font-bold">{t("workflow.title")}</h2>
        </div>
        <p className="max-w-xl text-sm text-muted-foreground">{t("workflow.subtitle")}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((item, index) => (
          <div
            key={item.key}
            className="relative overflow-hidden rounded-2xl border border-border/50 bg-background/80 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="text-5xl font-display font-bold text-primary/20">{item.step}</span>
            <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{item.description}</p>
            {index < steps.length - 1 && (
              <ArrowRight className="absolute right-4 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-primary/40 md:block" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
