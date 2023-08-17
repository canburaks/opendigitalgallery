/* eslint-disable @typescript-eslint/no-var-requires */
export const iyzico = require('iyzipay');

export const iyzipay = new iyzico({
  apiKey: process.env.IYZICO_API_KEY,
  secretKey: process.env.IYZICO_SECRET_KEY,
  uri: process.env.IYZICO_URI,
});
