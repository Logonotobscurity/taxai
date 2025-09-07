'use client';

import { useState } from 'react';
import type { z } from 'zod';
import { Card, CardContent } from '@/components/ui/card';
import { Stepper } from '@/components/tax-calculator/stepper';
import { TaxInputForm } from '@/components/tax-calculator/tax-input-form';
import { TaxResults } from '@/components/tax-calculator/tax-results';
import { AiInsights } from '@/components/tax-calculator/ai-insights';
import { FirsSubmission } from '@/components/tax-calculator/firs-submission';
import type { TaxFormSchema } from '@/lib/schemas';
import type { CalculateTaxWithAIOutput } from '@/ai/flows/calculate-tax-with-ai';

const steps = [
  { id: '01', name: 'Tax Information', href: '#' },
  { id: '02', name: 'Review & Calculate', href: '#' },
  { id: '03', name: 'AI Analysis', href: '#' },
  { id: '04', name: 'Submit to FIRS', href: '#' },
];

export default function CalculatorPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [taxData, setTaxData] = useState<z.infer<typeof TaxFormSchema> | null>(
    null
  );
  const [results, setResults] = useState<CalculateTaxWithAIOutput | null>(null);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormSubmit = (data: z.infer<typeof TaxFormSchema>) => {
    setTaxData(data);
    handleNext();
  };

  const handleCalculationComplete = (
    calculationResults: CalculateTaxWithAIOutput
  ) => {
    setResults(calculationResults);
    handleNext();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <TaxInputForm
            onSubmit={handleFormSubmit}
            initialData={taxData || undefined}
          />
        );
      case 1:
        return (
          <TaxResults
            taxData={taxData}
            onCalculationComplete={handleCalculationComplete}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <AiInsights results={results} taxData={taxData} onNext={handleNext} onBack={handleBack} />
        );
      case 3:
        return <FirsSubmission results={results} onBack={handleBack} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <Stepper
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
      <Card>
        <CardContent className="p-4 md:p-6">{renderStepContent()}</CardContent>
      </Card>
    </div>
  );
}
