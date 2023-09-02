/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'tr',
    locales: ['en', 'tr'],
  },
  localePath: path.resolve('public/locales'),
};
