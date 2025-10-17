import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, ShieldCheck, Mail, Lock } from "lucide-react";

const AdminLogin = () => {
  const { login, status, error, clearError, refreshSession } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/admin";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    clearError();
    setValidationError(null);
    setIsSubmitting(true);
    try {
      const loggedUser = await login(formState.email, formState.password);
      if (!loggedUser.isAdmin) {
        setValidationError("Este utilizador nao tem permissao de administrador.");
        setIsSubmitting(false);
        return;
      }
      await refreshSession().catch(() => undefined);
      navigate(from, { replace: true });
    } catch {
      setValidationError("Nao foi possivel iniciar sessao como admin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-sidebar/40 px-4 py-16">
      <Card className="w-full max-w-md animate-fade-in-up border border-border/60 bg-card/90 shadow-lg">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <CardTitle className="text-3xl font-display">Acesso administrador</CardTitle>
          <CardDescription>Autentica-te para aceder ao painel de utilizadores e subscricoes.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {(validationError || error) && (
            <Alert variant="destructive">
              <AlertDescription>{validationError || error}</AlertDescription>
            </Alert>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="admin-email" className="text-sm font-medium text-muted-foreground">
                Email profissional
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="admin-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formState.email}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="admin-password" className="text-sm font-medium text-muted-foreground">
                Palavra-passe
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="admin-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formState.password}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full rounded-xl bg-primary text-primary-foreground hover:shadow-glow"
              disabled={isSubmitting || status === "loading"}
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Entrar no painel"}
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground">
            Gestao normal da conta?{" "}
            <Link to="/login" className="font-medium text-primary hover:text-primary/80">
              Acede ao login do utilizador
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
