import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { Layout } from '@/components/layout';
import { SetupExperience } from '@/components/setup/SetupExperience';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'Mahoe 29 — Premium Linux Operating System',
    template: '%s | Mahoe 29',
  },
  description: 'A premium Linux-based operating system built on Kubuntu 26.04, featuring a sophisticated macOS-inspired desktop environment with deep customization.',
  keywords: ['Linux', 'Operating System', 'Kubuntu', 'KDE Plasma', 'Desktop Environment', 'Mahoe', 'Open Source'],
  authors: [{ name: 'Mahoe OS Team' }],
  creator: 'Mahoe OS Team',
  publisher: 'Mahoe OS',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mahoeos.org',
    siteName: 'Mahoe 29',
    title: 'Mahoe 29 — Premium Linux Operating System',
    description: 'A premium Linux-based operating system built on Kubuntu 26.04, featuring a sophisticated macOS-inspired desktop environment.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mahoe 29 Desktop Environment',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mahoe 29',
    description: 'A premium Linux-based operating system built on Kubuntu 26.04.',
    images: ['/images/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0d0d0f' },
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
  ],
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
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://objects.githubusercontent.com" />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Layout>
            {children}
            <SetupExperience onComplete={() => {}} />
          </Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}