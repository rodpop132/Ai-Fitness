import { Activity } from "lucide-react";

interface LoadingStateProps {
  message?: string;
  showSkeletons?: boolean;
}

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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
