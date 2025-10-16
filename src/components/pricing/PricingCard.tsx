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
<<<<<<< HEAD
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
=======
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
>>>>>>> b70027a8b05f3f1b40cd6b6a2be00ecc89aac79b
          <span className="text-4xl font-display font-bold">{price}</span>
          <span className="text-muted-foreground">€/{period}</span>
        </div>
      </div>

<<<<<<< HEAD
      <ul className="mb-6 flex flex-1 flex-col gap-3 text-sm text-muted-foreground">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Check className="h-3 w-3" />
            </span>
=======
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-sm">
            <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
>>>>>>> b70027a8b05f3f1b40cd6b6a2be00ecc89aac79b
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        onClick={onSelect}
<<<<<<< HEAD
        className={`w-full ${highlighted ? "gradient-ai text-white shadow-glow" : "bg-secondary hover:bg-secondary/80"}`}
=======
        className={`w-full ${
          highlighted 
            ? "gradient-ai text-white hover:opacity-90 shadow-glow" 
            : "bg-secondary hover:bg-secondary/80"
        }`}
>>>>>>> b70027a8b05f3f1b40cd6b6a2be00ecc89aac79b
        size="lg"
      >
        {buttonText}
      </Button>
    </Card>
  );
};
<<<<<<< HEAD

=======
>>>>>>> b70027a8b05f3f1b40cd6b6a2be00ecc89aac79b
