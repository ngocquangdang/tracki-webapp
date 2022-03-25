const { initReactI18next } = require('react-i18next');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de', 'ar', 'ja', 'es', 'pt', 'tr'],
    localeDetection: false,
    use: [initReactI18next],
    serializeConfig: false,
  },
  react: { useSuspense: false }, //this li
};
