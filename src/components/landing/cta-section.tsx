import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CtaSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-secondary px-6 py-24 text-center shadow-2xl rounded-2xl sm:px-16">
          <div className="absolute -top-24 left-1/2 -z-10 h-96 w-[150%] -translate-x-1/2 transform-gpu blur-3xl" aria-hidden="true">
            <div className="aspect-[1108/632] w-full bg-gradient-to-r from-primary to-accent opacity-20" />
          </div>
          <h2 className="mx-auto max-w-2xl font-headline text-3xl font-bold tracking-tight text-secondary-foreground sm:text-4xl">
            Ready to simplify your taxes?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-secondary-foreground/80">
            Sign up today and experience the future of tax compliance. Get instant calculations, personalized insights, and peace of mind.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg">
              <Link href="/dashboard">Get started now</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
