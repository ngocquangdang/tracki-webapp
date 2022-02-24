// #region Global Imports
import NextI18Next from 'next-i18next';
// #endregion Global Imports

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['en', 'es', 'pt', 'tr', 'ja', 'ar'],
  interpolation: {
    escapeValue: false, // react already safes from xss,
    format: (value, format) => {
      if (format === 'uppercase') return value.toUpperCase();
      return value;
    },
  },
});

export const { appWithTranslation, withTranslation } = NextI18NextInstance;

export default NextI18NextInstance;
