import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TESTIMONIALS } from "@/lib/content";
import { Quote } from "lucide-react";

export const TestimonialsSection = () => {
  const { t } = useTranslation();

  const testimonials = useMemo(
    () =>
      TESTIMONIALS.map(({ key }) => ({
        key,
        name: t(`testimonials.items.${key}.name`),
        role: t(`testimonials.items.${key}.role`),
        quote: t(`testimonials.items.${key}.quote`),
      })),
    [t],
  );

  return (
    <section id="testimonials" className="space-y-8">
      <div className="space-y-3 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.4em] text-primary/70">{t("header.badge")}</span>
        <h2 className="text-3xl font-display font-bold sm:text-4xl">{t("testimonials.title")}</h2>
        <p className="mx-auto max-w-2xl text-sm text-muted-foreground">{t("testimonials.subtitle")}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <figure
            key={testimonial.key}
            className="group relative h-full overflow-hidden rounded-3xl border border-border/60 bg-card/90 p-8 text-left shadow-md transition duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-glow"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Quote className="absolute right-6 top-6 h-10 w-10 text-primary/20 transition group-hover:text-primary/40" />
            <blockquote className="text-sm text-muted-foreground">{testimonial.quote}</blockquote>
            <figcaption className="mt-8">
              <p className="font-semibold text-foreground">{testimonial.name}</p>
              <p className="text-xs uppercase tracking-[0.3em] text-primary/70">{testimonial.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};
