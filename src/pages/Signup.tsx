import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, Lock } from "lucide-react";

const Signup = () => {
  const { signup, status, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ email: "", password: "", confirmPassword: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    clearError();
    setValidationError(null);

    if (formState.password !== formState.confirmPassword) {
      setValidationError("As palavras-passe nao coincidem.");
      return;
    }

    setIsSubmitting(true);
    try {
      await signup(formState.email, formState.password);
      navigate("/dashboard", { replace: true });
    } catch {
      // handled centraly
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-accent/20 px-4 py-16">
      <Card className="w-full max-w-md animate-fade-in-up shadow-glow-sm">
        <CardHeader className="space-y-4 text-center">
          <CardTitle className="text-3xl font-display">Cria a tua conta</CardTitle>
          <CardDescription>Embarca com a NutriFit AI e ativa o teu copiloto de saude.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {(error || validationError) && (
            <Alert variant="destructive">
              <AlertDescription>{validationError || error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-muted-foreground">
                Email profissional
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="tu@dominio.com"
                  required
                  value={formState.email}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-muted-foreground">
                Palavra-passe
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formState.password}
                  onChange={handleChange}
                  className="pl-10"
                  minLength={6}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-muted-foreground">
                Confirmar palavra-passe
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formState.confirmPassword}
                  onChange={handleChange}
                  className="pl-10"
                  minLength={6}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || status === "loading"}
              className="w-full rounded-xl bg-primary text-primary-foreground transition hover:translate-y-[-1px] hover:shadow-glow disabled:opacity-70"
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Criar conta"}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            Ja tens conta?{" "}
            <Link to="/login" className="font-medium text-primary transition hover:text-primary/80">
              Iniciar sessao
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;

