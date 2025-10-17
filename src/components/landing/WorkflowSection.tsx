import { WORKFLOW_STEPS } from "@/lib/content";
import { ArrowRight } from "lucide-react";

export const WorkflowSection = () => {
  return (
    <section id="workflow" className="rounded-3xl border border-border/60 bg-card/70 p-8 shadow-md md:p-12">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="text-sm font-semibold uppercase tracking-widest text-primary/80">Experiencia guiada</span>
          <h2 className="text-3xl font-display font-bold">Onboarding, acompanhamento e insights sem friccao</h2>
        </div>
        <p className="max-w-xl text-sm text-muted-foreground">
          Configura fluxos automaticos que recolhem dados, geram planos e sugerem ajustes inteligentes. Mantem-te no
          controlo com alertas contextuais.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {WORKFLOW_STEPS.map((item, index) => (
          <div
            key={item.step}
            className="relative overflow-hidden rounded-2xl border border-border/50 bg-background/80 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="text-5xl font-display font-bold text-primary/20">{item.step}</span>
            <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{item.description}</p>
            {index < WORKFLOW_STEPS.length - 1 && (
              <ArrowRight className="absolute right-4 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-primary/40 md:block" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

