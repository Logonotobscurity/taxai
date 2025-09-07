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
  metadataBase: new URL('https://taxcomply.ai'), // Replace with your actual domain
  title: {
    default: 'TaxComply AI - AI-Powered Tax Solutions',
    template: '%s | TaxComply AI',
  },
  description:
    'TaxComply AI is an intelligent platform that helps you handle your FIRS taxes with accuracy, ease, and peace of mind. Get instant calculations, personalized insights, and seamless compliance.',
  keywords: [
    'tax compliance',
    'AI tax assistant',
    'FIRS tax calculator',
    'tax optimization',
    'Nigeria tax laws',
  ],
  authors: [{ name: 'TaxComply AI Team' }],
  openGraph: {
    title: 'TaxComply AI - AI-Powered Tax Solutions',
    description:
      'Handle your FIRS taxes with accuracy and ease. Get instant calculations, personalized insights, and seamless compliance.',
    url: 'https://taxcomply.ai', // Replace with your actual domain
    siteName: 'TaxComply AI',
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
    title: 'TaxComply AI - AI-Powered Tax Solutions',
    description:
      'Handle your FIRS taxes with accuracy and ease. Get instant calculations, personalized insights, and seamless compliance.',
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
          <div className="relative flex min-h-dvh flex-col">{children}</div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
