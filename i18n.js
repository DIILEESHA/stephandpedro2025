import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import homeEN from "./src/locales/en/home.json";
import homePT from "./src/locales/pt/home.json";
import detailEN from "./src/locales/en/detail.json";
import detailPT from "./src/locales/pt/detail.json";
import parallaxEN from "./src/locales/en/parallax.json";
import parallaxPT from "./src/locales/pt/parallax.json";
import travelEN from "./src/locales/en/travel.json";
import travelPT from "./src/locales/pt/travel.json";
import toEN from "./src/locales/en/to.json";
import toPT from "./src/locales/pt/to.json";
import countdownEN from "./src/locales/en/countdown.json";
import countdownPT from "./src/locales/pt/countdown.json";
import locationEN from "./src/locales/en/location.json";
import locationPT from "./src/locales/pt/location.json";

// NEW
import galleryEN from "./src/locales/en/gallery.json";
import galleryPT from "./src/locales/pt/gallery.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        home: homeEN,
        detail: detailEN,
        parallax: parallaxEN,
        travel: travelEN,
        to: toEN,
        countdown: countdownEN,
        location: locationEN,
        gallery: galleryEN
      },
      pt: {
        home: homePT,
        detail: detailPT,
        parallax: parallaxPT,
        travel: travelPT,
        to: toPT,
        countdown: countdownPT,
        location: locationPT,
        gallery: galleryPT
      }
    },
    lng: "pt",
    fallbackLng: "pt",
    ns: ["home", "detail", "parallax", "travel", "to", "countdown", "location", "gallery"],
    defaultNS: "home",
    interpolation: { escapeValue: false },
    detection: { order: ["localStorage", "navigator"], caches: ["localStorage"] }
  });

export default i18n;
