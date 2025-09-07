'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="relative bg-background">
      <div className="circuit-background"></div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-32">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          <span className="block">Intelligent Tax Compliance</span>
          <span className="block text-primary">Made Simple for Nigerians</span>
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-lg text-muted-foreground sm:max-w-xl">
          Leverage the power of AI to accurately calculate, manage, and optimize your taxes according to the latest FIRS guidelines.
        </p>
        <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
          <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-1 sm:gap-5 sm:space-y-0">
            <Button asChild size="lg" className="gradient-primary shadow-lg">
              <Link href="/dashboard">
                Get Started for Free
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="relative z-10 mx-auto -mt-16 max-w-5xl px-4 sm:px-6 lg:px-8">
        <Image
          src="https://picsum.photos/1200/600"
          alt="TaxAI Dashboard"
          width={1200}
          height={600}
          className="rounded-xl border shadow-2xl"
          data-ai-hint="dashboard finance"
        />
      </div>
    </section>
  );
}
