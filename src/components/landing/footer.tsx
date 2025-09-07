import { Logo } from '@/components/icons';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 lg:px-8">
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          <div className="pb-6">
            <Link href="#features" className="text-sm leading-6 text-muted-foreground hover:text-primary">
              Features
            </Link>
          </div>
          <div className="pb-6">
            <Link href="/login" className="text-sm leading-6 text-muted-foreground hover:text-primary">
              Pricing
            </Link>
          </div>
          <div className="pb-6">
            <Link href="/login" className="text-sm leading-6 text-muted-foreground hover:text-primary">
              About
            </Link>
          </div>
          <div className="pb-6">
            <Link href="/login" className="text-sm leading-6 text-muted-foreground hover:text-primary">
              Contact
            </Link>
          </div>
        </nav>
        <div className="mt-10 flex justify-center space-x-10">
          {/* Social icons can be added here */}
        </div>
        <p className="mt-10 text-center text-xs leading-5 text-muted-foreground">
          &copy; {new Date().getFullYear()} TaxAI, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
