import { HeroSection } from "@/components/landing/HeroSection";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { WorkflowSection } from "@/components/landing/WorkflowSection";
import { MetricsSection } from "@/components/landing/MetricsSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { PricingPreview } from "@/components/landing/PricingPreview";
import { FAQSection } from "@/components/landing/FAQSection";
import { CTASection } from "@/components/landing/CTASection";
import { SectionDivider } from "@/components/layout/SectionDivider";

const Index = () => {
  return (
    <div className="flex flex-col bg-background">
      <section className="bg-background">
        <div className="container mx-auto px-6 pb-16 pt-12">
          <HeroSection />
        </div>
      </section>

      <SectionDivider tone="muted" className="-mt-px" />

      <section className="bg-[hsl(var(--muted))] py-20">
        <div className="container mx-auto space-y-24 px-6">
          <FeatureGrid />
          <WorkflowSection />
        </div>
      </section>

      <SectionDivider tone="background" className="-mt-px" />

      <section className="bg-background py-20">
        <div className="container mx-auto space-y-24 px-6">
          <MetricsSection />
          <TestimonialsSection />
        </div>
      </section>

      <SectionDivider tone="card" className="-mt-px" />

      <section className="bg-[hsl(var(--card))] py-20">
        <div className="container mx-auto space-y-24 px-6">
          <PricingPreview />
          <FAQSection />
          <CTASection />
        </div>
      </section>
    </div>
  );
};

export default Index;
