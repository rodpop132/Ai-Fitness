import { Link, useLocation, useNavigate } from "react-router-dom";
import { Activity, Menu, LogOut, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { label: "Funcionalidades", href: "/#features" },
  { label: "Como funciona", href: "/#workflow" },
  { label: "Testemunhos", href: "/#testimonials" },
  { label: "Planos", href: "/pricing" },
];

const isInternalHash = (href: string) => href.includes("#");

export const SiteHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { status, user, logout } = useAuth();

  const renderNavLink = (item: (typeof navItems)[number], mobile = false) => {
    const hashTarget = item.href.split("#")[1] ?? "";
    const isActive =
      (!isInternalHash(item.href) && location.pathname === item.href) ||
      (isInternalHash(item.href) && location.pathname === "/" && location.hash === `#${hashTarget}`);

    const linkClass =
      "text-sm font-medium transition-colors hover:text-primary data-[active=true]:text-primary data-[active=true]:font-semibold";

    if (isInternalHash(item.href)) {
      return (
        <a key={item.label} href={item.href} className={`${linkClass} ${mobile ? "block py-2" : ""}`} data-active={isActive}>
          {item.label}
        </a>
      );
    }

    return (
      <Link key={item.label} to={item.href} className={`${linkClass} ${mobile ? "block py-2" : ""}`} data-active={isActive}>
        {item.label}
      </Link>
    );
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
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

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => renderNavLink(item))}
          {status === "authenticated" && (
            <>
              <Link
                to="/dashboard"
                data-active={location.pathname === "/dashboard"}
                className="text-sm font-medium text-muted-foreground transition hover:text-primary data-[active=true]:text-primary"
              >
                Dashboard
              </Link>
              {user?.isAdmin && (
                <Link
                  to="/admin"
                  data-active={location.pathname.startsWith("/admin")}
                  className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition hover:text-primary data-[active=true]:text-primary"
                >
                  <ShieldCheck className="h-4 w-4" />
                  Admin
                </Link>
              )}
            </>
          )}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          {status === "authenticated" ? (
            <>
              <div className="flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-3 py-1">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
                  {user?.email?.slice(0, 1).toUpperCase()}
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="text-xs font-medium text-foreground">{user?.email}</span>
                  <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    Plano {user?.plan}
                  </span>
                </div>
              </div>
              <Button className="rounded-xl bg-primary text-primary-foreground hover:shadow-glow" onClick={() => navigate("/chat")}>
                Abrir chat
              </Button>
              <Button
                variant="outline"
                className="gap-2 rounded-xl border border-destructive/30 text-destructive hover:bg-destructive/10"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button className="rounded-xl bg-primary text-primary-foreground hover:shadow-glow" onClick={() => navigate("/signup")}>
                Criar conta
              </Button>
            </>
          )}
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
                <nav className="space-y-2">
                  {navItems.map((item) => renderNavLink(item, true))}
                  {status === "authenticated" && (
                    <>
                      <Link
                        to="/dashboard"
                        className="block py-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
                        data-active={location.pathname === "/dashboard"}
                      >
                        Dashboard
                      </Link>
                      {user?.isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-2 py-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
                          data-active={location.pathname.startsWith("/admin")}
                        >
                          <ShieldCheck className="h-4 w-4" />
                          Admin
                        </Link>
                      )}
                    </>
                  )}
                </nav>
                {status === "authenticated" ? (
                  <>
                    <Button className="w-full gradient-ai text-white shadow-glow" onClick={() => navigate("/chat")}>
                      Abrir chat
                    </Button>
                    <Button variant="outline" className="w-full gap-2" onClick={handleLogout}>
                      <LogOut className="h-4 w-4" />
                      Sair
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="w-full gradient-ai text-white shadow-glow" onClick={() => navigate("/signup")}>
                      Criar conta
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => navigate("/login")}>
                      Login
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

