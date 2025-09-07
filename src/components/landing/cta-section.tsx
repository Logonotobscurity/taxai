import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CtaSection() {
  return (
    <div className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-primary/90 px-6 py-24 text-center shadow-2xl rounded-2xl sm:px-16">
          <div className="absolute -top-24 left-1/2 -z-10 h-96 w-[150%] -translate-x-1/2 transform-gpu blur-3xl" aria-hidden="true">
            <div className="aspect-[1108/632] w-full bg-gradient-to-r from-[#28A745] to-[#1B365D] opacity-20" />
          </div>
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Ready to simplify your taxes?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-foreground/80">
            Sign up today and experience the future of tax compliance. Get instant calculations, personalized insights, and peace of mind.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/dashboard">Get started now</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
