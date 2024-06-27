'use client';

import { LanguageConfig } from '@/configs/LanguageConfig';
import { changeLanguage } from '@/utils/Cookies';
import { useLocale, useTranslations } from 'next-intl';
import { ChangeEvent, useTransition } from 'react';

export default function SettingsForm() {
  const t = useTranslations('Settings');

  const [isPending, startTransition] = useTransition();
  const localeActive = useLocale();
  const onSelectchange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      changeLanguage(nextLocale);
    });
  };

  return (
    <div className="flex min-h-screen flex-col gap-2">
      <h1>{t('title')}</h1>
      <div>
        <select onChange={onSelectchange} defaultValue={localeActive} disabled={isPending}>
          {LanguageConfig.availableLanguages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {t(lang.text)}
            </option>
          ))}
          {/* <option value="en">English</option>
          <option value="es">Español</option> */}
        </select>
      </div>
    </div>
  );
}
