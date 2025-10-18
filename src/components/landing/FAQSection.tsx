import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FAQ_ITEMS } from "@/lib/content";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
      className="grid gap-8 rounded-3xl border border-border/60 bg-card/70 p-8 shadow-md md:grid-cols-[2fr_3fr] md:p-12"
    >
      <div className="space-y-4">
        <span className="text-sm font-semibold uppercase tracking-widest text-primary/80">FAQ</span>
        <h2 className="text-3xl font-display font-bold">{t("faq.title")}</h2>
        <p className="text-sm text-muted-foreground">{t("faq.subtitle")}</p>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {items.map((item, index) => (
          <AccordionItem
            key={item.key}
            value={`faq-${index}`}
            className="rounded-2xl border border-border/60 bg-background/70 px-4"
          >
            <AccordionTrigger className="text-left text-base font-semibold">{item.question}</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
