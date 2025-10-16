import { Link } from "react-router-dom";
import { Activity, Github, Linkedin, Mail } from "lucide-react";

const footerLinks = [
  {
    title: "Produto",
    items: [
      { label: "Funcionalidades", href: "/#features" },
      { label: "Como funciona", href: "/#workflow" },
      { label: "Planos", href: "/pricing" },
    ],
  },
  {
    title: "Apoio",
    items: [
      { label: "FAQ", href: "/#faq" },
      { label: "Suporte", href: "mailto:hello@nutrifit.ai" },
      { label: "Documentação", href: "/pricing" },
    ],
  },
];

export const SiteFooter = () => {
  const year = new Date().getFullYear();

  const renderLink = (item: { label: string; href: string }) => {
    const isMail = item.href.startsWith("mailto:");
    const isHash = item.href.includes("#");

    if (isMail) {
      return (
        <a key={item.label} href={item.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
          {item.label}
        </a>
      );
    }

    if (isHash) {
      return (
        <a key={item.label} href={item.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
          {item.label}
        </a>
      );
    }

    return (
      <Link key={item.label} to={item.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
        {item.label}
      </Link>
    );
  };

  return (
    <footer className="border-t border-border/60 bg-card/40 backdrop-blur">
      <div className="container mx-auto grid gap-16 px-6 py-12 md:grid-cols-[2fr_1fr_1fr]">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Activity className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2rem] text-primary/80">NutriFit AI</p>
              <p className="text-lg font-display font-semibold">Smart Health Buddy</p>
            </div>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Automação inteligente para nutrição, treino e acompanhamento de progresso. Ajuda cada pessoa a tomar melhores
            decisões com insights sustentados por dados.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <Mail className="h-4 w-4 text-primary" />
            <a href="mailto:hello@nutrifit.ai" className="transition-colors hover:text-primary">
              hello@nutrifit.ai
            </a>
          </div>
        </div>

        {footerLinks.map((column) => (
          <div key={column.title} className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{column.title}</h4>
            <div className="flex flex-col gap-3">{column.items.map(renderLink)}</div>
          </div>
        ))}
      </div>

      <div className="border-t border-border/40 bg-background/60">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {year} NutriFit AI. Construído com ciência, tecnologia e empatia.</p>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border/80 p-2 transition-all hover:border-primary/70 hover:text-primary"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border/80 p-2 transition-all hover:border-primary/70 hover:text-primary"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

