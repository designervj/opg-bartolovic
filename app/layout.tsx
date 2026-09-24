import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700'],
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hr">
      <body
        className={`${inter.variable} ${montserrat.variable} bg-background text-foreground antialiased `}
      >
        {children}
      </body>
    </html>
  );
}
