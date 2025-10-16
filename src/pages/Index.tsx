<<<<<<< HEAD
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
=======
import { useNavigate } from "react-router-dom";
import { LoadingState } from "@/components/LoadingState";
import { useEffect, useState } from "react";

const Index = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      navigate("/chat");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  if (isLoading) {
    return <LoadingState message="A preparar o teu espaço saudável..." />;
  }

  return null;
>>>>>>> b70027a8b05f3f1b40cd6b6a2be00ecc89aac79b
};

export default Index;
