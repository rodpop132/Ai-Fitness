import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FAQ_ITEMS } from "@/lib/content";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sparkles } from "lucide-react";

export const FAQSection = () => {
  const { t } = useTranslation();

  const items = useMemo(
    () =>
      FAQ_ITEMS.map(({ key }) => ({
        key,
        question: t(`faq.items.${key}.question`),
        answer: t(`faq.items.${key}.answer`),
      })),
    [t],
  );

  return (
    <section
      id="faq"
      className="grid gap-10 rounded-[32px] border border-border/50 bg-gradient-to-br from-card/90 via-card to-card/90 p-10 shadow-lg md:grid-cols-[2fr_3fr] md:p-14"
    >
      <div className="space-y-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          FAQ
        </span>
        <h2 className="text-3xl font-display font-bold sm:text-4xl">{t("faq.title")}</h2>
        <p className="text-sm text-muted-foreground md:text-base">{t("faq.subtitle")}</p>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {items.map((item, index) => (
          <AccordionItem
            key={item.key}
            value={`faq-${index}`}
            className="rounded-2xl border border-border/60 bg-background/80 px-4 transition hover:border-primary/40"
          >
            <AccordionTrigger className="text-left text-base font-semibold">{item.question}</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
