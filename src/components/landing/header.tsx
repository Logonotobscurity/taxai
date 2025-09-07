'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ThemeToggle } from '../theme-toggle';

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#insights', label: 'Insights' },
  { href: '/about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

const companyLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/careers', label: 'Careers' },
    { href: '/press', label: 'Press' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled ? 'py-2' : 'py-4'
      )}
    >
      <div
        className={cn(
          'container mx-auto flex items-center justify-between transition-all duration-300 ease-in-out',
          isScrolled ? 'max-w-6xl rounded-lg bg-background/80 backdrop-blur-lg shadow-lg p-4' : 'max-w-4xl px-4'
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">TaxComply AI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'relative text-sm font-medium text-muted-foreground transition-colors hover:text-primary',
                pathname === link.href && 'text-primary'
              )}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"></span>
              )}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Button className="gradient-primary shadow" asChild>
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                   <Link href="/" className="flex items-center gap-2">
                     <span className="text-lg font-bold text-primary">TaxComply AI</span>
                   </Link>
                   <SheetClose asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                   </SheetClose>
                </div>
                <div className="flex-1 p-4">
                    <Accordion type="multiple" className="w-full">
                        <AccordionItem value="features">
                            <AccordionTrigger>Features</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-2 pl-2">
                                {navLinks.map(link => (
                                     <SheetClose asChild key={link.href}>
                                        <Link href={link.href} className="py-2 text-muted-foreground hover:text-primary">{link.label}</Link>
                                     </SheetClose>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                         <AccordionItem value="company">
                            <AccordionTrigger>Company</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-2 pl-2">
                                {companyLinks.map(link => (
                                     <SheetClose asChild key={link.href}>
                                        <Link href={link.href} className="py-2 text-muted-foreground hover:text-primary">{link.label}</Link>
                                     </SheetClose>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
                <div className="p-4 border-t mt-auto">
                    <div className="flex items-center justify-between">
                        <ThemeToggle />
                        <Button className="gradient-primary shadow" asChild>
                            <Link href="/dashboard">Get Started</Link>
                        </Button>
                    </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
