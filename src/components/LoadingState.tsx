import { Activity } from "lucide-react";

interface LoadingStateProps {
  message?: string;
  showSkeletons?: boolean;
}

<<<<<<< HEAD
export const LoadingState = ({
  message = "A preparar o teu espaço saudável…",
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
          <h1 className="mt-6 text-3xl font-display font-semibold text-foreground sm:text-4xl">A configurar o teu espaço personalizado</h1>
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
=======
export const LoadingState = ({ 
  message = "A preparar o teu espaço saudável...", 
  showSkeletons = true 
}: LoadingStateProps) => {
  return (
    <div className="min-h-screen w-full bg-background gradient-loading flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="w-full max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          {/* Logo with glow effect */}
          <div className="inline-flex items-center gap-3 mb-6">
            <Activity className="w-10 h-10 sm:w-12 sm:h-12 text-primary animate-pulse-heart animate-glow" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground tracking-tight">
              NutriFit AI
            </h1>
          </div>
          
          {/* Loading message */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <span className="text-sm sm:text-base text-muted-foreground">{message}</span>
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-typing" style={{ animationDelay: "0s" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-typing" style={{ animationDelay: "0.2s" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-typing" style={{ animationDelay: "0.4s" }} />
            </div>
          </div>
        </div>

        {showSkeletons && (
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 sm:gap-6 animate-slide-up px-4 sm:px-0">
            {/* Sidebar Skeleton - Hidden on mobile */}
            <div className="hidden lg:block space-y-4 bg-card/50 backdrop-blur-sm rounded-2xl p-4 border border-border/50 shadow-lg">
              <div className="h-10 bg-muted/50 rounded-lg animate-pulse" />
              <div className="space-y-2">
                {[80, 60, 70, 50, 75, 65].map((width, i) => (
                  <div 
                    key={i} 
                    className="h-8 bg-muted/50 rounded-md animate-pulse" 
                    style={{ width: `${width}%`, animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            </div>

            {/* Main Chat Area Skeleton */}
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-border/50 shadow-lg space-y-6">
              {/* Message from User */}
              <div className="flex justify-end animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <div className="max-w-[85%] sm:max-w-[80%] space-y-2">
                  <div className="h-3 sm:h-4 w-24 sm:w-32 bg-muted/50 rounded animate-pulse ml-auto" />
                  <div className="bg-primary/10 rounded-2xl p-3 sm:p-4 space-y-2">
                    <div className="h-3 sm:h-4 bg-muted/50 rounded animate-pulse" />
                    <div className="h-3 sm:h-4 w-3/4 bg-muted/50 rounded animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Message from AI */}
              <div className="flex justify-start animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <div className="max-w-[85%] sm:max-w-[80%] space-y-2">
                  <div className="h-3 sm:h-4 w-20 sm:w-24 bg-muted/50 rounded animate-pulse" />
                  <div className="gradient-ai rounded-2xl p-3 sm:p-4 space-y-2 shadow-glow">
                    <div className="h-3 sm:h-4 bg-white/20 rounded animate-pulse" />
                    <div className="h-3 sm:h-4 bg-white/20 rounded animate-pulse" />
                    <div className="h-3 sm:h-4 w-5/6 bg-white/20 rounded animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Input Area Skeleton */}
              <div className="pt-4 border-t border-border/50 animate-fade-in" style={{ animationDelay: "0.6s" }}>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-10 sm:h-12 bg-muted/50 rounded-xl animate-pulse" />
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-muted/50 rounded-xl animate-pulse" />
                </div>
              </div>
>>>>>>> b70027a8b05f3f1b40cd6b6a2be00ecc89aac79b
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
<<<<<<< HEAD

=======
>>>>>>> b70027a8b05f3f1b40cd6b6a2be00ecc89aac79b
