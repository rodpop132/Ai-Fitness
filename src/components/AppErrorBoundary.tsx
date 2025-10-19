import { Component, ErrorInfo, ReactNode } from "react";

interface AppErrorBoundaryProps {
  children: ReactNode;
}

interface AppErrorBoundaryState {
  hasError: boolean;
  message?: string;
  stack?: string;
}

export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return { hasError: true, message: error?.message ?? "Unexpected application error", stack: error?.stack };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Application error boundary captured:", error, info);
    this.setState({ stack: error?.stack ?? info.componentStack });
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
              <div className="space-y-2 rounded-md bg-card px-4 py-3 text-left text-sm text-destructive shadow-sm">
                <div className="font-semibold">Message:</div>
                <code className="block whitespace-pre-wrap">{this.state.message}</code>
                {this.state.stack && (
                  <>
                    <div className="font-semibold text-foreground">Stack trace:</div>
                    <code className="block max-h-64 overflow-y-auto whitespace-pre-wrap text-xs text-muted-foreground">
                      {this.state.stack}
                    </code>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
