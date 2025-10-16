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
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-4">
            <Activity className="w-8 h-8 text-primary animate-pulse-heart" />
            <h1 className="text-3xl font-display font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              NutriFit AI
            </h1>
          </div>
          
          <div className="flex items-center justify-center gap-2 mt-6">
            <span className="text-muted-foreground">{message}</span>
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-typing" style={{ animationDelay: "0s" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-typing" style={{ animationDelay: "0.2s" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-typing" style={{ animationDelay: "0.4s" }} />
            </div>
          </div>
        </div>

        {showSkeletons && (
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 animate-slide-up">
            {/* Sidebar Skeleton */}
            <div className="hidden lg:block space-y-4 bg-card rounded-2xl p-4 border shadow-md">
              <div className="h-10 bg-muted rounded-lg animate-pulse" />
              <div className="space-y-2">
                {[80, 60, 70, 50, 75, 65].map((width, i) => (
                  <div 
                    key={i} 
                    className="h-8 bg-muted rounded-md animate-pulse" 
                    style={{ width: `${width}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Main Chat Area Skeleton */}
            <div className="bg-card rounded-2xl p-6 border shadow-md space-y-6">
              {/* Message from User */}
              <div className="flex justify-end">
                <div className="max-w-[80%] space-y-2">
                  <div className="h-4 w-32 bg-muted rounded animate-pulse ml-auto" />
                  <div className="bg-primary/10 rounded-2xl p-4 space-y-2">
                    <div className="h-4 bg-muted rounded animate-pulse" />
                    <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Message from AI */}
              <div className="flex justify-start">
                <div className="max-w-[80%] space-y-2">
                  <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                  <div className="gradient-ai rounded-2xl p-4 space-y-2">
                    <div className="h-4 bg-white/20 rounded animate-pulse" />
                    <div className="h-4 bg-white/20 rounded animate-pulse" />
                    <div className="h-4 w-5/6 bg-white/20 rounded animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Input Area Skeleton */}
              <div className="pt-4 border-t">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-12 bg-muted rounded-xl animate-pulse" />
                  <div className="w-12 h-12 bg-muted rounded-xl animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
