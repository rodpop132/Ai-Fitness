import { Activity } from "lucide-react";

interface LoadingStateProps {
  message?: string;
  showSkeletons?: boolean;
}

export const LoadingState = ({
  message = "A preparar o teu espaco saudavel...",
  showSkeletons = true,
}: LoadingStateProps) => {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.25),transparent_55%)] opacity-80" />
      <div className="relative z-10 w-full max-w-6xl px-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-primary/30 bg-background/70 px-4 py-2 shadow-md">
            <Activity className="h-6 w-6 animate-pulse text-primary" />
            <span className="text-sm font-medium text-primary">NutriFit AI</span>
          </div>
          <h1 className="mt-6 text-3xl font-display font-semibold text-foreground sm:text-4xl">
            A configurar o teu espaco personalizado
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">{message}</p>
        </div>

        {showSkeletons && (
          <div className="mt-12 grid gap-6 lg:grid-cols-[280px_1fr]">
            <div className="hidden space-y-4 rounded-3xl border border-border/60 bg-card/70 p-4 shadow-md lg:block">
              <div className="h-10 rounded-xl bg-muted/60" />
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-8 rounded-lg bg-muted/40" />
              ))}
            </div>
            <div className="space-y-4 rounded-3xl border border-border/60 bg-card/70 p-4 shadow-md">
              <div className="h-12 rounded-xl bg-muted/40" />
              <div className="h-20 rounded-xl bg-muted/30" />
              <div className="h-20 rounded-xl bg-muted/30" />
              <div className="h-14 rounded-xl bg-muted/40" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

