import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

import { LanguageConfig } from './configs/LanguageConfig';

export default getRequestConfig(async () => {
  const locale = cookies().get(LanguageConfig.languageCookieName)?.value || LanguageConfig.defaultLocale;

  return {
    locale,
    messages: (await import(`@/locales/${locale}.json`)).default,
  };
});
