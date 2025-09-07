import { Button } from '@/components/ui/button';

export function StatementSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="circuit-background"></div>
      <div className="container relative z-10 text-center max-w-4xl mx-auto">
        <h2 className="text-[clamp(1.8rem,5vw,3rem)] font-bold uppercase">
          We are a <span className="text-primary">small</span> team, but we are{' '}
          <span className="text-accent">versatile</span> and we deliver{' '}
          <span className="text-primary">results</span>.
        </h2>
        <Button size="lg" className="mt-8">
          Start a Conversation
        </Button>
      </div>
    </section>
  );
}
