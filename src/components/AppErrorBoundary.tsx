import { Component, ErrorInfo, ReactNode } from "react";

interface AppErrorBoundaryProps {
  children: ReactNode;
}

interface AppErrorBoundaryState {
  hasError: boolean;
  message?: string;
}

export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return { hasError: true, message: error?.message ?? "Unexpected application error" };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Application error boundary captured:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background text-center text-foreground">
          <div className="max-w-xl space-y-4 px-6">
            <h1 className="text-3xl font-display font-bold">Something went wrong</h1>
            <p className="text-sm text-muted-foreground">
              We were unable to load this view. Try refreshing the page. If the problem persists, contact support with the
              message below.
            </p>
            {this.state.message && (
              <code className="block rounded-md bg-card px-4 py-3 text-sm text-destructive shadow-sm">
                {this.state.message}
              </code>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
