import { Link, useLocation } from "react-router-dom";
import { Activity, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { label: "Funcionalidades", href: "/#features" },
  { label: "Como funciona", href: "/#workflow" },
  { label: "Testemunhos", href: "/#testimonials" },
  { label: "Planos", href: "/pricing" },
];

const isInternalHash = (href: string) => href.includes("#");

export const SiteHeader = () => {
  const location = useLocation();

  const renderNavLink = (item: (typeof navItems)[number], mobile = false) => {
    const hashTarget = item.href.split("#")[1] ?? "";
    const isActive =
      (!isInternalHash(item.href) && location.pathname === item.href) ||
      (isInternalHash(item.href) && location.pathname === "/" && location.hash === `#${hashTarget}`);

    const baseClass =
      "text-sm font-medium transition-colors hover:text-primary data-[active=true]:text-primary data-[active=true]:font-semibold";

    if (isInternalHash(item.href)) {
      return (
        <a
          key={item.label}
          href={item.href}
          className={`${baseClass} ${mobile ? "block py-2" : ""}`}
          data-active={isActive}
        >
          {item.label}
        </a>
      );
    }

    return (
      <Link key={item.label} to={item.href} className={`${baseClass} ${mobile ? "block py-2" : ""}`} data-active={isActive}>
        {item.label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4">
        <Link to="/" className="group flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary transition-transform group-hover:rotate-6">
            <Activity className="h-5 w-5" />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary/80">NutriFit</span>
            <span className="text-lg font-display font-bold">Smart Health Buddy</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">{navItems.map((item) => renderNavLink(item))}</nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Button asChild variant="default" className="gradient-ai text-white shadow-glow">
            <Link to="/chat">Iniciar chat</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-10 w-10">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <div className="mt-8 space-y-6">
                <nav className="space-y-2">{navItems.map((item) => renderNavLink(item, true))}</nav>
                <Button asChild className="w-full gradient-ai text-white shadow-glow">
                  <Link to="/chat">Iniciar chat</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/pricing">Ver planos</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
