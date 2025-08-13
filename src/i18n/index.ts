import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend) // tarjimalarni yuklab olish
  .use(LanguageDetector) // brauzer tilini aniqlash
  .use(initReactI18next) // react integratsiyasi
  .init({
    fallbackLng: "uz", // default til
    supportedLngs: ["uz", "ru", "en"],

    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // publicdan o'qiladi
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
