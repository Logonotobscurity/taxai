import type { Metadata } from 'next';
import { Anton, Rubik } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/context/auth-context';
import { ThemeProvider } from '@/components/theme-provider';

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
  metadataBase: new URL('https://log-on.pro'), // Replace with your actual domain
  title: {
    default: 'LOG_ON - Your Generalist Tech Partner',
    template: '%s | LOG_ON',
  },
  description:
    'The generalist tech solution for ambitious companies. We are a versatile team of problem solvers dedicated to helping you navigate the complexities of technology and achieve your business goals.',
  keywords: [
    'tech solutions',
    'AI automation',
    'financial modeling',
    'custom software',
    'cloud architecture',
  ],
  authors: [{ name: 'LOG_ON Team' }],
  openGraph: {
    title: 'LOG_ON - Generalist Tech Solutions',
    description:
      'Versatile tech solutions for ambitious companies. AI, custom software, and cloud architecture.',
    url: 'https://log-on.pro', // Replace with your actual domain
    siteName: 'LOG_ON',
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
    title: 'LOG_ON - Generalist Tech Solutions',
    description:
      'Versatile tech solutions for ambitious companies. AI, custom software, and cloud architecture.',
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="relative flex min-h-dvh flex-col">{children}</div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
