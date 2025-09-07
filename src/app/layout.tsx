import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair'
});

export const metadata: Metadata = {
  title: 'Aali Tigana - Premium Dried Fruits | Dates, Figs, Apricots & More',
  description: 'Discover the finest selection of premium dried fruits at Aali Tigana. From Medjool dates to Turkish figs, organic apricots to golden raisins - naturally sweet, healthy, and delicious.',
  keywords: 'dried fruits, dates, figs, apricots, raisins, organic, healthy snacks, natural, Medjool dates, Turkish figs',
  authors: [{ name: 'Aali Tigana' }],
  creator: 'Aali Tigana',
  publisher: 'Aali Tigana',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aalitigana.com',
    title: 'Aali Tigana - Premium Dried Fruits',
    description: 'Premium dried fruits sourced from the finest regions worldwide. Natural, healthy, and delicious.',
    siteName: 'Aali Tigana'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aali Tigana - Premium Dried Fruits',
    description: 'Premium dried fruits sourced from the finest regions worldwide.',
    creator: '@aalitigana'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#8B4513" />
        <meta name="msapplication-TileColor" content="#8B4513" />
      </head>
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 text-amber-900 antialiased`}>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster 
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#FED7AA',
                color: '#92400E',
                border: '1px solid #F59E0B'
              }
            }}
          />
        </CartProvider>
      </body>
    </html>
  );
}