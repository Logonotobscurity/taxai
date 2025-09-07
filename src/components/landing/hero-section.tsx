import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { Illustration } from './illustration';

export function HeroSection() {
  return (
    <section className="relative bg-background overflow-hidden">
      <div className="circuit-background"></div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <h1 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              <span className="block">Intelligent Tax Compliance</span>
              <span className="block text-primary">Made Simple for Nigerians</span>
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-lg text-muted-foreground lg:mx-0">
              Leverage the power of AI to accurately calculate, manage, and optimize your taxes according to the latest FIRS guidelines.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row lg:justify-start">
              <Button asChild size="lg" className="gradient-primary w-full shadow-lg sm:w-auto">
                <Link href="/dashboard">
                  Get Started for Free
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <Link href="#">
                  <PlayCircle className="mr-2" />
                  Watch Demo
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
