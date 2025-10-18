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
    <section id="testimonials" className="space-y-6">
      <div className="space-y-2 text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-primary/80">{t("header.badge")}</span>
        <h2 className="text-3xl font-display font-bold sm:text-4xl">{t("testimonials.title")}</h2>
        <p className="mx-auto max-w-2xl text-sm text-muted-foreground">{t("testimonials.subtitle")}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.key}
            className="relative h-full rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <Quote className="absolute right-6 top-6 h-10 w-10 text-primary/20" />
            <blockquote className="text-sm text-muted-foreground">{testimonial.quote}</blockquote>
            <figcaption className="mt-6">
              <p className="font-semibold">{testimonial.name}</p>
              <p className="text-xs uppercase tracking-widest text-primary/70">{testimonial.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};
