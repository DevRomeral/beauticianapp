import { AlertProvider } from '@/contexts/AlertContext';
import { SessionProvider } from '@/contexts/SessionContext';
import type { Metadata } from 'next';
import '@/styles/globals.scss';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Manrope } from 'next/font/google';

import AlertDialog from '@/components/alerts/AlertDialog';
import NavBar from '@/components/navbar/Navbar';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const font = Manrope({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  style: ['normal'],
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  // const locale = useLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={font.className}>
        <NextIntlClientProvider messages={messages}>
          <AlertProvider>
            <SessionProvider>
              <AlertDialog />
              <NavBar />
              <main>{children}</main>
            </SessionProvider>
          </AlertProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
