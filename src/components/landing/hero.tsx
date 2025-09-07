'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] w-full items-center">
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="circuit-background"></div>
        <div className="absolute -top-24 left-1/2 -z-10 h-96 w-[150%] -translate-x-1/2 transform-gpu blur-3xl" aria-hidden="true">
            <div className="aspect-[1108/632] w-full bg-gradient-to-r from-primary to-accent opacity-20" />
        </div>
      </div>
      <div className="container mx-auto flex max-w-4xl flex-col items-center justify-center text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-primary">
          Your Partner in Growth
        </p>
        <h1 className="mt-4 text-[clamp(2.5rem,8vw,5rem)] font-bold font-headline leading-tight">
          Transform <span className="text-primary">Tax & Finance</span> Into Growth — Fast.
        </h1>
        <p className="mt-6 max-w-2xl text-md md:text-xl text-muted-foreground">
          We are a versatile team of problem solvers dedicated to helping you navigate the complexities of technology and achieve your business goals.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild>
            <Link href="/calculator">Start Calculating Taxes</Link>
          </Button>
          <Button size="lg" variant="secondary">
            Explore Compliance Features
          </Button>
        </div>
      </div>
    </section>
  );
}
