'use client';
import { ArrowBack, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { CalculateTaxWithAIOutput } from '@/ai/flows/calculate-tax-with-ai';

type FirsSubmissionProps = {
  results: CalculateTaxWithAIOutput | null;
  onBack: () => void;
};

export function FirsSubmission({ results, onBack }: FirsSubmissionProps) {
  const handleSubmit = () => {
    alert('This is a demo. No data will be submitted to FIRS.');
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>FIRS Submission</CardTitle>
          <CardDescription>
            Review your final tax figures before submitting to FIRS.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border bg-card p-4">
            <div className="flex justify-between text-lg font-medium">
              <span>Total Tax Payable</span>
              <span>₦{results?.totalTax.toLocaleString() || '0.00'}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Taxable Income</span>
              <span>₦{results?.taxableIncome.toLocaleString() || '0.00'}</span>
            </div>
          </div>
          <Alert>
            <AlertTitle>Disclaimer</AlertTitle>
            <AlertDescription>
              This is a simulation. Clicking &quot;Submit to FIRS&quot; will not send any
              data to the Federal Inland Revenue Service.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} size="lg">
          <ArrowBack className="mr-2 h-4 w-4" />
          Back to AI Insights
        </Button>
        <Button onClick={handleSubmit} size="lg" className="bg-accent hover:bg-accent/90">
          Submit to FIRS
          <Send className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
