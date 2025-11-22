import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translations
import homeEN from "./src/locales/en/home.json";
import homePT from "./src/locales/pt/home.json";
import detailEN from "./src/locales/en/detail.json";
import detailPT from "./src/locales/pt/detail.json";
import parallaxEN from "./src/locales/en/parallax.json";
import parallaxPT from "./src/locales/pt/parallax.json";
import travelEN from "./src/locales/en/travel.json";
import travelPT from "./src/locales/pt/travel.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { 
        home: homeEN,
        detail: detailEN,
        parallax: parallaxEN,
        travel: travelEN
      },
      pt: { 
        home: homePT,
        detail: detailPT,
        parallax: parallaxPT,
        travel: travelPT
      },
    },
    lng: "pt",
    fallbackLng: "pt",
    ns: ["home", "detail", "parallax", "travel"],
    defaultNS: "home",
    interpolation: { escapeValue: false },
    detection: { order: ["localStorage", "navigator"], caches: ["localStorage"] },
  });

export default i18n;
