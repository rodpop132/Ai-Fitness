<<<<<<< HEAD
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
=======
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
>>>>>>> b70027a8b05f3f1b40cd6b6a2be00ecc89aac79b

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
<<<<<<< HEAD
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
=======
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-gray-600">Oops! Page not found</p>
        <a href="/" className="text-blue-500 underline hover:text-blue-700">
          Return to Home
        </a>
>>>>>>> b70027a8b05f3f1b40cd6b6a2be00ecc89aac79b
      </div>
    </div>
  );
};

export default NotFound;
<<<<<<< HEAD

=======
>>>>>>> b70027a8b05f3f1b40cd6b6a2be00ecc89aac79b
