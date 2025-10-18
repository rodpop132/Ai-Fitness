import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const LANGUAGES: Array<{ code: string; label: string }> = [
  { code: "en", label: "English" },
  { code: "pt", label: "Português" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
];

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const current = LANGUAGES.find((item) => item.code === i18n.resolvedLanguage) ?? LANGUAGES[0];

  const handleSelect = async (code: string) => {
    if (code !== i18n.language) {
      await i18n.changeLanguage(code);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-10 w-10" aria-label={t("common.language")}>
          <Globe2 className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="text-xs uppercase tracking-widest text-muted-foreground">
          {t("common.language")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {LANGUAGES.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onSelect={() => handleSelect(language.code)}
            className={cn("flex items-center justify-between text-sm", language.code === current.code && "font-semibold")}
          >
            <span>{language.label}</span>
            {language.code === current.code && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
