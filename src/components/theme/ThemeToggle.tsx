import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="relative h-10 w-10" aria-label="Alternar tema">
        <Sun className="h-5 w-5" />
      </Button>
    );
  }

  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative h-10 w-10"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Mudar para tema claro" : "Mudar para tema escuro"}
    >
      <Sun className={`h-5 w-5 transition-opacity ${isDark ? "opacity-0" : "opacity-100"}`} />
      <Moon className={`h-5 w-5 absolute transition-opacity ${isDark ? "opacity-100" : "opacity-0"}`} />
    </Button>
  );
};
