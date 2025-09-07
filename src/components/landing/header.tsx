import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import { ThemeToggle } from '../theme-toggle';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="size-8 text-primary" />
            <span className="font-headline text-lg font-semibold text-primary">LOG_ON</span>
          </Link>
          <nav className="hidden md:flex md:gap-4">
            <Link href="#services" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Services
            </Link>
            <Link href="#insights" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Insights
            </Link>
            <Link href="#contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
           <ThemeToggle />
          <Button className="gradient-primary shadow" asChild>
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
