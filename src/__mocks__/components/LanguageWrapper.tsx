import { LanguageConfig } from '@/__mocks__/configs/LanguageConfig';
import { NextIntlClientProvider } from 'next-intl';

interface Props {
  children: React.ReactNode;
}

const LanguageWrapper = ({ children }: Props) => {
  return (
    <NextIntlClientProvider messages={LanguageConfig.messages} locale={LanguageConfig.defaultLocale}>
      {children}
    </NextIntlClientProvider>
  );
};
export default LanguageWrapper;
