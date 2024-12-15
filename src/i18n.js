import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpBackend) // Load translations from JSON files
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    fallbackLng: "en", // Default language if detected language is not available
    lng: "en", // Default language (optional)
    debug: true, // Enable debug logs in development
    ns: ["about us", "Privacy Policy","TermsOfService","Home" ,"header" ,"footer" , "sidepar"], // Specify namespaces
    interpolation: {
      escapeValue: false, // React already escapes values to prevent XSS
    },
    backend: {
      loadPath: "/translate/{{lng}}/{{ns}}.json", // Path to translation files
    },
  });

export default i18n;