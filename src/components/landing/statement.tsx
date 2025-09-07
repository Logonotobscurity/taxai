import { Button } from '@/components/ui/button';

export function StatementSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="circuit-background"></div>
      <div className="container relative z-10 text-center max-w-4xl mx-auto">
        <h2 className="text-[clamp(1.8rem,5vw,3rem)] font-bold leading-tight">
          Create accurate <span className="text-primary">financial forecasts</span> and <span className="text-primary">tax scenarios</span> with our
          <span className="text-primary"> powerful modeling tools</span> that adapt to changing regulations and
          business conditions.
        </h2>
        <Button size="lg" className="mt-8">
          Start a Conversation
        </Button>
      </div>
    </section>
  );
}
