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
  period = "mes",
  description,
  features,
  highlighted = false,
  buttonText,
  onSelect,
}: PricingCardProps) => {
  return (
    <Card
      className={`relative flex h-full flex-col p-6 transition hover:-translate-y-1 hover:shadow-lg ${
        highlighted
          ? "border-2 border-primary/70 bg-gradient-to-b from-primary/10 via-card to-card text-foreground shadow-glow"
          : "border border-border/70 bg-card/90"
      }`}
    >
      {highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold uppercase text-primary-foreground shadow-md">
          Mais popular
        </div>
      )}

      <div className="mb-6 text-center">
        <h3 className="text-xl font-display font-bold">{name}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>

        <div className="mt-6 flex items-baseline justify-center gap-1">
          <span className="text-4xl font-display font-bold">{price}</span>
          <span className="text-muted-foreground">EUR/ {period}</span>
        </div>
      </div>

      <ul className="mb-6 flex flex-1 flex-col gap-3 text-sm text-muted-foreground">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Check className="h-3 w-3" />
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        onClick={onSelect}
        className={`w-full ${highlighted ? "gradient-ai text-white shadow-glow" : "bg-secondary hover:bg-secondary/80"}`}
        size="lg"
      >
        {buttonText}
      </Button>
    </Card>
  );
};




