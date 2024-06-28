// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector'; // Ensure this is imported correctly

i18n
  .use(HttpBackend) // Optionally use a backend to load translation files
  .use(LanguageDetector) // Use the language detector
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    fallbackLng: 'it',
    debug: false, // Set to true to see logs in the console

    interpolation: {
      escapeValue: false, // Not needed for React as it escapes by default
    },

    // Define the backend loader options if you're using 'i18next-http-backend'
    backend: {
      loadPath: '/locales/{{lng}}.v2.json', // Path to the locales
    },

    detection: {
      // Configuration options for the language detector
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie'], // Cache the detected language in localStorage and cookies
    },
  });

export default i18n;
