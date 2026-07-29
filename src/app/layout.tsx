import type { Metadata } from 'next';
import { Poppins, Inter, Hind_Siliguri } from 'next/font/google';
import { Header } from '@/components/shared/header';
import './globals.css';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

const inter = Inter({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const hindSiliguri = Hind_Siliguri({
  weight: ['400', '500', '600', '700'],
  subsets: ['bengali', 'latin'],
  variable: '--font-hind-siliguri',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Purple BD — Handicrafts & Art Supplies',
  description:
    'Your one-stop destination for authentic handicrafts, art supplies, and creative materials in Bangladesh.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`${poppins.variable} ${inter.variable} ${hindSiliguri.variable} h-full antialiased`}
    >
      <body className='min-h-full flex flex-col font-body text-gray-700 bg-white'>
        <Header />
        {children}
      </body>
    </html>
  );
}
