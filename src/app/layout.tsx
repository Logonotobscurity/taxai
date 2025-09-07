import type { Metadata } from 'next';
import { Anton, Rubik } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/context/auth-context';

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anton',
  display: 'swap',
});

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
  display: 'swap',
  weight: ['300', '400', '500', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://taxai.pro'), // Replace with your actual domain
  title: {
    default: 'TaxAI - Your FIRS Finance Partner',
    template: '%s | TaxAI',
  },
  description: 'AI-Powered Tax Calculation and Optimization for Nigerian Professionals and SMEs. Simplify your FIRS tax compliance with smart tools and personalized insights.',
  keywords: ['tax calculator', 'Nigeria tax', 'FIRS', 'PAYE', 'tax optimization', 'AI finance'],
  authors: [{ name: 'TaxAI Team' }],
  openGraph: {
    title: 'TaxAI - AI-Powered Tax Compliance',
    description: 'Simplify your Nigerian taxes with AI. Instant calculations, smart insights, and easy compliance.',
    url: 'https://taxai.pro', // Replace with your actual domain
    siteName: 'TaxAI',
    images: [
      {
        url: '/og-image.png', // It's good practice to have an OG image
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TaxAI - AI-Powered Tax Compliance',
    description: 'Simplify your Nigerian taxes with AI. Instant calculations, smart insights, and easy compliance.',
    images: ['/og-image.png'], // It's good practice to have an OG image
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          anton.variable,
          rubik.variable
        )}
      >
        <AuthProvider>
          <div className="relative flex min-h-dvh flex-col">
            {children}
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
