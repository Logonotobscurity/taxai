import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Illustration } from './illustration';

export function HeroSection() {
  return (
    <section className="relative bg-background overflow-hidden">
      <div className="circuit-background"></div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <h1 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              <span className="block">Master Your Taxes</span>
              <span className="block text-primary">With AI-Powered Confidence</span>
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-lg text-muted-foreground lg:mx-0">
              Stop guessing. Start knowing. Our intelligent platform helps you handle your FIRS taxes with accuracy, ease, and peace of mind.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <Button asChild size="lg" className="w-full shadow-lg sm:w-auto">
                <Link href="/dashboard">
                  Estimate Your Tax in Seconds
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <Illustration />
          </div>
        </div>
      </div>
    </section>
  );
}
