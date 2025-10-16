import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.warn("Rota não encontrada:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 px-6 py-16 text-center">
      <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/15 text-primary">
        <Compass className="h-10 w-10" />
      </span>
      <div className="space-y-3">
        <h1 className="text-4xl font-display font-bold">Ups, esta página perdeu o plano alimentar.</h1>
        <p className="text-base text-muted-foreground">
          Não encontramos o endereço <span className="font-semibold text-foreground">{location.pathname}</span>. Volta ao
          início ou abre o chatbot para obter ajuda imediata.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild variant="secondary" className="gap-2">
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            Voltar ao início
          </Link>
        </Button>
        <Button asChild className="gradient-ai text-white shadow-glow">
          <Link to="/chat">Abrir chatbot</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

