import { LocaleType, LocaleEnum } from '@/types';

export const LOCALES_LIST = ['en', 'tr'] as const;
export const CURRENCIES_LIST = ['USD', 'TRY'] as const;
export const COUNTRY_CODE_LIST = [221, 213] as const;

export const I18N: any = {
  [LocaleEnum.EN]: { currency: 'USD', locale: 'en', country: 'US', code: 221 },
  [LocaleEnum.TR]: { currency: 'TRY', locale: 'tr', country: 'TR', code: 213 },
};
// type I18NItemType = {
//   currency: (typeof CURRENCIES_LIST)[number];
//   locale: (typeof LOCALES_LIST)[number];
//   country: string;
//   code: number;
// };

export const DEFAULT_LOCALE: LocaleType = LocaleEnum.EN;
export const DEFAULT_COUNTRY_CODE = COUNTRY_CODE_LIST[0];
export const DEFAULT_CURRENCY = I18N[DEFAULT_LOCALE].currency;

export function getLocaleValues(locale?: (typeof LOCALES_LIST)[number] | undefined) {
  if (!locale || I18N[locale]) return I18N[DEFAULT_LOCALE];
  return I18N[locale];
}
