import { HeroSection } from "@/components/landing/HeroSection";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { WorkflowSection } from "@/components/landing/WorkflowSection";
import { MetricsSection } from "@/components/landing/MetricsSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { PricingPreview } from "@/components/landing/PricingPreview";
import { FAQSection } from "@/components/landing/FAQSection";
import { CTASection } from "@/components/landing/CTASection";

const Index = () => {
  return (
    <div className="container mx-auto space-y-24 px-6 pb-20 pt-10">
      <HeroSection />
      <FeatureGrid />
      <WorkflowSection />
      <MetricsSection />
      <TestimonialsSection />
      <PricingPreview />
      <FAQSection />
      <CTASection />
    </div>
  );
};

export default Index;
