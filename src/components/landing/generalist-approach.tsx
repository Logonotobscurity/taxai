import { CheckCircle } from 'lucide-react';
import { Card, CardTitle } from '@/components/ui/card';

export function GeneralistApproachSection() {
  return (
    <section className="w-full bg-secondary/20 py-16 md:py-24">
      <div className="container grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="font-headline text-[clamp(2rem,6vw,3.5rem)] font-bold leading-tight">
            A <span className="text-primary">Generalist</span> Approach to Specialized Problems
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <Card className="p-6 bg-background/80 backdrop-blur-sm transition-all hover:scale-105">
            <CardTitle className="mb-4">Our Expertise</CardTitle>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>AI Integration</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Custom Software</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Cloud Architecture</span>
              </li>
            </ul>
          </Card>
          <Card className="p-6 bg-background/80 backdrop-blur-sm transition-all hover:scale-105">
            <CardTitle className="mb-4">Your Advantage</CardTitle>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Holistic Solutions</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Future-Proofing</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Cost-Effective</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}
