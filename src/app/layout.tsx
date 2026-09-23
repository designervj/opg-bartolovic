import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Space_Mono } from 'next/font/google';
import '../index.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  weight: ['400', '500', '600', '700'],
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
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
        className={`${plusJakartaSans.variable} ${spaceMono.variable} bg-white text-neutral-900 antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
