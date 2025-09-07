'use client';
import type { z } from 'zod';
import {
  TrendingUp,
  ArrowLeft,
  ArrowRight,
  Lightbulb,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import type { TaxFormSchema } from '@/lib/schemas';
import type { CalculateTaxWithRulesOutput } from '@/ai/flows/calculate-tax-with-rules';

type AiInsightsProps = {
  results: CalculateTaxWithRulesOutput | null;
  taxData: z.infer<typeof TaxFormSchema> | null;
  onNext: () => void;
  onBack: () => void;
};

export function AiInsights({ results, taxData, onNext, onBack }: AiInsightsProps) {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Lightbulb className="h-6 w-6" />
            </div>
            <div>
              <CardTitle>AI Tax Analysis</CardTitle>
              <CardDescription>
                Personalized recommendations to optimize your tax position.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {results?.aiRecommendations && results.aiRecommendations.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {results.aiRecommendations.map((rec, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      <span>{rec.split(':')[0]}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {rec.split(':').slice(1).join(':').trim()}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="text-muted-foreground">
              No specific AI recommendations available based on the provided
              data.
            </p>
          )}
        </CardContent>
      </Card>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} size="lg">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Results
        </Button>
        <Button onClick={onNext} size="lg">
          Proceed to Submission
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
