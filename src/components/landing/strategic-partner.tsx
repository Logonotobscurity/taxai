'use client';

import {
  BrainCircuit,
  Calculator,
  ArrowRight,
} from 'lucide-react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from '@/components/ui/dialog';

export function StrategicPartnerSection() {
  return (
    <section id="services" className="w-full bg-secondary/20 py-16 md:py-24">
      <div className="container grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h2 className="text-2xl md:text-4xl font-bold">
            Your Strategic Tech Partner
          </h2>
          <p className="text-muted-foreground md:text-lg">
            We believe in a three-step process to ensure your success:
          </p>
          <ol className="space-y-4">
            <li className="flex items-start gap-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                1
              </span>
              <div>
                <h3 className="font-semibold">Discovery & Assessment</h3>
                <p className="text-muted-foreground">
                  We start by understanding your business, challenges, and goals.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                2
              </span>
              <div>
                <h3 className="font-semibold">Solution & Implementation</h3>
                <p className="text-muted-foreground">
                  We design and build a tailored solution to address your specific needs.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                3
              </span>
              <div>
                <h3 className="font-semibold">Growth & Support</h3>
                <p className="text-muted-foreground">
                  We provide ongoing support to help you scale and adapt.
                </p>
              </div>
            </li>
          </ol>
        </div>
        <div className="space-y-8">
          <Dialog>
            <DialogTrigger asChild>
              <Card className="cursor-pointer transition-all hover:-translate-y-2">
                <CardHeader>
                  <BrainCircuit className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>AI & Automation</CardTitle>
                  <CardDescription>
                    Leverage artificial intelligence to automate processes and unlock new efficiencies.
                  </CardDescription>
                  <span className="flex items-center text-sm font-semibold text-primary mt-2 group">
                    Learn More
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </CardHeader>
              </Card>
            </DialogTrigger>
            <DialogContent>
              {/* Content for AI & Automation */}
              AI & Automation details...
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Card className="cursor-pointer transition-all hover:-translate-y-2">
                <CardHeader>
                  <Calculator className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Financial & Tax Modeling</CardTitle>
                  <CardDescription>
                    Build robust financial models to forecast, plan, and optimize your tax strategy.
                  </CardDescription>
                   <span className="flex items-center text-sm font-semibold text-primary mt-2 group">
                    Learn More
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </CardHeader>
              </Card>
            </DialogTrigger>
            <DialogContent>
              {/* Content for Financial & Tax Modeling */}
              Financial & Tax Modeling details...
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
