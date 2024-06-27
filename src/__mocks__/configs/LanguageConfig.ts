import { AbstractIntlMessages } from 'next-intl';

export const LanguageConfig = {
  defaultLocale: 'es',
  messagesAsync: async (): Promise<AbstractIntlMessages> =>
    (await import(`../../../messages/${LanguageConfig.defaultLocale}.json`)).default,
  messages: {},
};
