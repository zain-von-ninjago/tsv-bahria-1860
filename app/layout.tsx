import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import { Envelope, WhatsappLogo, MapPin } from '@phosphor-icons/react/ssr';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import { Providers } from '@/components/providers';
import { Navbar } from '@/components/navbar';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
});

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'TSV Bahria 1860 — Football Academy in Bahria Town Karachi',
  description: 'TSV Bahria 1860 is a premier football academy in Bahria Town, Karachi. Train with professional coaches, develop your skills, and join our waitlist today.',
  keywords: ['football academy', 'TSV Bahria 1860', 'Bahria Town Karachi', 'soccer training', 'youth football', 'football coaching'],
  openGraph: {
    title: 'TSV Bahria 1860 — Football Academy in Bahria Town Karachi',
    description: 'Train with professional coaches and develop your football skills at TSV Bahria 1860.',
    type: 'website',
    locale: 'en_US',
    siteName: 'TSV Bahria 1860',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TSV Bahria 1860 — Football Academy',
    description: 'Train with professional coaches and develop your football skills at TSV Bahria 1860.',
  },
  robots: 'index, follow',
};

export const viewport: Viewport = {
  themeColor: '#050508',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${jakartaSans.variable} dark`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <Script src="/three.min.js" strategy="beforeInteractive" />
        <Script
          src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/DRACOLoader.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="fixed inset-0 -z-10 radial-glow-accent" aria-hidden="true" />
        <div className="fixed inset-0 -z-10 radial-glow-gold" aria-hidden="true" />
        <div className="noise-overlay" aria-hidden="true" />
        <Providers>
          <Navbar />
          {children}
          <Analytics />
          <footer className="border-t border-border py-12 md:py-16">
            <div className="container-main">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex items-center gap-3">
                    <img
                      src="/logo/tsv-bahria-1860-nobg.png"
                      alt="TSV Bahria 1860 logo"
                      className="h-10 w-10 object-contain"
                    />
                    <div>
                      <div className="font-display font-semibold text-foreground">
                        TSV BAHRIA 1860 &mdash; KARACHI, PAKISTAN
                      </div>
                      <div className="text-small text-foreground-muted">
                        Head Coach: Zain Rizvi Syed
                      </div>
                    </div>
                  </div>
                  <nav className="flex flex-wrap items-center gap-6 text-small text-foreground-muted">
                    <a href="#why-join-us" className="hover:text-accent transition-colors">Why Join Us</a>
                    <a href="#coach" className="hover:text-accent transition-colors">Meet the Coach</a>
                    <a href="#success" className="hover:text-accent transition-colors">Success Stories</a>
                    <a href="#training" className="hover:text-accent transition-colors">How We Train</a>
                    <a href="#waitlist" className="hover:text-accent transition-colors">Age Groups &amp; Fees</a>
                  </nav>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 pt-6 border-t border-border/40">
                  <a
                    href="mailto:zainasad@gmail.com"
                    className="inline-flex items-center gap-2 text-small text-foreground-muted hover:text-accent transition-colors"
                  >
                    <Envelope className="h-4 w-4" /> zainasad@gmail.com
                  </a>
                  <a
                    href="https://wa.me/4915757292178"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-small text-foreground-muted hover:text-accent transition-colors"
                  >
                    <WhatsappLogo className="h-4 w-4" /> +49 1575 7292178
                  </a>
                  <span className="inline-flex items-center gap-2 text-small text-foreground-muted">
                    <MapPin className="h-4 w-4" /> Bahria Town, Karachi, Pakistan
                  </span>
                </div>
                <p className="text-micro text-foreground-muted">
                  © {new Date().getFullYear()} TSV Bahria 1860 Football Academy. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}