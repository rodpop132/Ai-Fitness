import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "@/locales/en.json";
import pt from "@/locales/pt.json";
import es from "@/locales/es.json";
import fr from "@/locales/fr.json";
import de from "@/locales/de.json";
import it from "@/locales/it.json";

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
      es: { translation: es },
      fr: { translation: fr },
      de: { translation: de },
      it: { translation: it }
    },
    fallbackLng: "en",
    supportedLngs: ["en", "pt", "es", "fr", "de", "it"],
    defaultNS: "translation",
    ns: ["translation"],
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ["localStorage", "navigator", "querystring"],
      caches: ["localStorage"],
      lookupLocalStorage: "nutrifit-language"
    }
  });

export default i18n;
