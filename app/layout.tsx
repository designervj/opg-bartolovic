import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'OPG Bartolović - Prirodni domaći med',
  description:
    'OPG Bartolović - Iz košnice do tvog doma, prirodno, s ljubavlju. Vrhunski slavonski med iz vlastitih pčelinjaka u Valpovu.',
  openGraph: {
    title: 'OPG Bartolović - Prirodni domaći med',
    description:
      'OPG Bartolović - Iz košnice do tvog doma, prirodno, s ljubavlju. Vrhunski slavonski med iz vlastitih pčelinjaka u Valpovu.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

import ThemeProvider from './ThemeContext';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hr" className={`${inter.variable} ${montserrat.variable}`}>
      <body
        className={`${inter.className} bg-background text-foreground antialiased `}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
