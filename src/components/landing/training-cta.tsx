import { GraduationCap, Briefcase, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function TrainingCtaSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary/20">
      <div className="container grid lg:grid-cols-3 gap-8">
        <div className="space-y-4">
          <GraduationCap className="h-10 w-10 text-primary" />
          <h2 className="text-2xl font-bold">Upskill Your Team</h2>
          <p className="text-muted-foreground">
            We offer corporate training programs to empower your team with the latest tech skills.
          </p>
          <Button>Explore Training</Button>
        </div>
        <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <Briefcase className="h-8 w-8 text-primary mb-2" />
              <CardTitle>AI for Business Leaders</CardTitle>
              <CardDescription>
                A non-technical overview of how to leverage AI for business growth.
              </CardDescription>
              <Button variant="link" className="p-0 h-auto mt-2">Learn More</Button>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <BarChart className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Data-Driven Decision Making</CardTitle>
              <CardDescription>
                Learn how to interpret data and make informed decisions that drive results.
              </CardDescription>
              <Button variant="link" className="p-0 h-auto mt-2">Learn More</Button>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}
