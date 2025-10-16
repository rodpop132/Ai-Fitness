import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  buttonText: string;
  onSelect: () => void;
}

export const PricingCard = ({
  name,
  price,
  period = "mês",
  description,
  features,
  highlighted = false,
  buttonText,
  onSelect,
}: PricingCardProps) => {
  return (
    <Card className={`relative p-6 hover-lift ${
      highlighted 
        ? "border-2 border-primary shadow-glow bg-gradient-to-b from-primary/5 to-transparent" 
        : "border bg-card"
    }`}>
      {highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 gradient-ai text-white text-xs font-semibold rounded-full shadow-lg">
          Mais Popular
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-xl font-display font-bold mb-2">{name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-display font-bold">{price}</span>
          <span className="text-muted-foreground">€/{period}</span>
        </div>
      </div>

      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-sm">
            <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        onClick={onSelect}
        className={`w-full ${
          highlighted 
            ? "gradient-ai text-white hover:opacity-90 shadow-glow" 
            : "bg-secondary hover:bg-secondary/80"
        }`}
        size="lg"
      >
        {buttonText}
      </Button>
    </Card>
  );
};
