'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import type { z } from 'zod';
import { Card, CardContent } from '@/components/ui/card';
import { Stepper } from '@/components/tax-calculator/stepper';
import { TaxInputForm } from '@/components/tax-calculator/tax-input-form';
import { TaxResults } from '@/components/tax-calculator/tax-results';
import { AiInsights } from '@/components/tax-calculator/ai-insights';
import { FirsSubmission } from '@/components/tax-calculator/firs-submission';
import type { TaxFormSchema } from '@/lib/schemas';
import type { CalculateTaxWithRulesOutput } from '@/ai/flows/calculate-tax-with-rules';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  { id: '01', name: 'Tax Information', href: '#' },
  { id: '02', name: 'Review & Calculate', href: '#' },
  { id: '03', name: 'AI Analysis', href: '#' },
  { id: '04', name: 'Submit to FIRS', href: '#' },
];

export default function CalculatorPage() {
  const searchParams = useSearchParams();
  const initialIncome = searchParams.get('income');

  const [currentStep, setCurrentStep] = useState(0);
  
  const [taxData, setTaxData] = useState<z.infer<typeof TaxFormSchema> | null>(
    initialIncome ? { 
        income: Number(initialIncome), 
        taxYear: '2024',
        calculationType: 'paye',
        employmentType: 'employee',
        deductions: {},
        allowances: {}
    } : null
  );

  const [results, setResults] = useState<CalculateTaxWithRulesOutput | null>(null);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for back

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormSubmit = (data: z.infer<typeof TaxFormSchema>) => {
    setTaxData(data);
    handleNext();
  };

  const handleCalculationComplete = (
    calculationResults: CalculateTaxWithRulesOutput
  ) => {
    setResults(calculationResults);
    handleNext();
  };
  
  const handleStepClick = (stepIndex: number) => {
    if (stepIndex < currentStep) {
      setDirection(stepIndex - currentStep > 0 ? 1 : -1);
      setCurrentStep(stepIndex);
    }
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
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
    <div className="space-y-4 md:space-y-8">
      <Stepper
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={handleStepClick}
      />
      <Card className="overflow-hidden">
        <CardContent className="p-4 md:p-6 relative min-h-[60vh]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="w-full"
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
