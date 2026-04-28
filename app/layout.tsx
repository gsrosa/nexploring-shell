import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { AppProviders } from '@/shared/providers';

import '@/styles/global.css';

const SUPPORTED_LOCALES = ['en-US', 'pt-BR', 'es-ES'] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

function getLocaleFromCookie(
  cookieStore: Awaited<ReturnType<typeof cookies>>,
): SupportedLocale {
  const lang = cookieStore.get('nexploring-lang')?.value;
  return lang && (SUPPORTED_LOCALES as readonly string[]).includes(lang)
    ? (lang as SupportedLocale)
    : 'en-US';
}

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: {
    template: '%s | Nexploring',
    default: 'Nexploring — Your trips, planned by AI',
  },
  description:
    'Plan your perfect trip with an AI that understands your style, preferences, and travel goals.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const locale = getLocaleFromCookie(cookieStore);

  return (
    <html lang={locale}>
      <body suppressHydrationWarning>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
