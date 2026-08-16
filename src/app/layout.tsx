import type { Metadata } from 'next';
import { Poppins, Inter, Hind_Siliguri } from 'next/font/google';
import { Header } from '@/components/shared/header';
import { Footer } from '@/components/shared/footer';
import { CartDrawer } from '@/components/shared/cart';
import { CartProvider } from '@/lib/cart-context';
import { WishlistProvider } from '@/lib/wishlist-context';
import { CompareProvider } from '@/lib/compare-context';
import { AuthProvider } from '@/lib/auth-context';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { FloatingContact } from '@/components/ui/floating-contact';
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
      data-scroll-behavior='smooth'
      className={`${poppins.variable} ${inter.variable} ${hindSiliguri.variable} h-full antialiased`}
    >
      <body className='min-h-full flex flex-col font-body text-gray-700 bg-white'>
        <CartProvider>
          <WishlistProvider>
            <CompareProvider>
              <AuthProvider>
                <Header />
                <main className='flex-1 pb-16 lg:pb-0'>{children}</main>
                <Footer />
                <CartDrawer />
                <ScrollToTop />
                <FloatingContact />
              </AuthProvider>
            </CompareProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
