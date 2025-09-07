'use client';
import { ArrowLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { CalculateTaxWithRulesOutput } from '@/ai/flows/calculate-tax-with-rules';
import { Info } from 'lucide-react';

type FirsSubmissionProps = {
  results: CalculateTaxWithRulesOutput | null;
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
          <div className="rounded-lg border-2 border-dashed bg-card p-6 text-center">
            <div className="text-sm font-medium text-muted-foreground">Total Tax Payable</div>
            <div className="text-4xl font-bold tracking-tight text-primary">
              ₦{results?.totalTax.toLocaleString(undefined, {minimumFractionDigits: 2}) || '0.00'}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Based on a taxable income of ₦{results?.taxableIncome.toLocaleString() || '0.00'}
            </div>
          </div>
          <Alert>
            <Info className="h-4 w-4" />
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
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to AI Insights
        </Button>
        <Button onClick={handleSubmit} size="lg" className="gradient-primary">
          Submit to FIRS
          <Send className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
