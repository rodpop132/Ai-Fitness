import { FEATURE_CARDS } from "@/lib/content";

export const FeatureGrid = () => {
  return (
    <section id="features" className="space-y-6">
      <div className="space-y-3 text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-primary/80">Super poderes</span>
        <h2 className="text-3xl font-display font-bold sm:text-4xl">Tudo o que precisas num so painel</h2>
        <p className="mx-auto max-w-2xl text-base text-muted-foreground">
          IA conversacional, automacao de planos, analise de imagens e dashboards de progresso, tudo em ambiente seguro e
          personalizavel.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {FEATURE_CARDS.map((feature, index) => (
          <article
            key={feature.title}
            className="group h-full animate-slide-up rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-2xl"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-2xl text-primary shadow-inner transition group-hover:scale-105 group-hover:bg-primary/20">
              {feature.icon}
            </span>
            <h3 className="text-xl font-display font-semibold">{feature.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{feature.description}</p>
            <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition group-hover:opacity-100" />
          </article>
        ))}
      </div>
    </section>
  );
};
