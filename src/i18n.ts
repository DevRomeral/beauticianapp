import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

import { LanguageConfig } from './configs/LanguageConfig';

export default getRequestConfig(async () => {
  const locale = cookies().get('NEXT_LOCALE')?.value || LanguageConfig.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
