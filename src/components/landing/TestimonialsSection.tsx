import { TESTIMONIALS } from "@/lib/content";
import { Quote } from "lucide-react";

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="space-y-6">
      <div className="space-y-2 text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-primary/80">Prova social</span>
        <h2 className="text-3xl font-display font-bold sm:text-4xl">Coaches e equipas clínicas confiam na NutriFit AI</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((testimonial) => (
          <figure
            key={testimonial.name}
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

