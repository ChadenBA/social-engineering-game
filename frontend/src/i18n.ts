import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en/phishing.json";
import frTranslation from "./locales/fr/phishing.json";
import quizEn from "./locales/en/quiz.json"
import quizFr from "./locales/fr/quiz.json"
import cyberEn from "./locales/en/cybersafety.json";
import cyberFr from "./locales/fr/cybersafety.json";
import homeEn from "./locales/en/home.json";
import homeFr from "./locales/fr/home.json";
import footEn from "./locales/en/footer.json";
import footFr from "./locales/fr/footer.json";
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation, quiz: quizEn,cyber: cyberEn  , home:homeEn , footer:footEn  },
    fr: { translation: frTranslation, quiz: quizFr, cyber: cyberFr ,  home:homeFr , footer:footFr  },
  },
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  
});


export default i18n;
