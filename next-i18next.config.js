const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de', 'ar', 'ja', 'es', 'pt', 'tr'],
    // localeDetection: false,
    serializeConfig: false,
    ...(typeof window === undefined && {
      localePath: path.resolve('./public/locales'),
    }),
  },
};
