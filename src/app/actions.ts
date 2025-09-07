'use server';

import { calculateTaxWithAI } from '@/ai/flows/calculate-tax-with-ai';
import { generatePersonalizedTaxInsights } from '@/ai/flows/generate-personalized-tax-insights';
import { proposeTaxOptimizationStrategies } from '@/ai/flows/propose-tax-optimization-strategies';
import type { z } from 'zod';
import type {
  ProposeTaxOptimizationStrategiesInput,
  GeneratePersonalizedTaxInsightsInput,
} from '@/ai/flows/propose-tax-optimization-strategies';
import type { TaxFormSchema } from '@/lib/schemas';
import { FormulaEngine } from '@/services/formula-engine';

export async function calculateTaxAction(
  data: z.infer<typeof TaxFormSchema>
) {
  const taxData = {
    income: data.income,
    taxYear: data.taxYear,
    employmentType: data.employmentType,
    deductions: data.deductions,
    allowances: data.allowances,
  };

  const result = await calculateTaxWithAI({
    taxData,
    calculationType: data.calculationType,
  });

  return result;
}

export async function getOptimizationStrategiesAction(
  data: ProposeTaxOptimizationStrategiesInput
) {
  const result = await proposeTaxOptimizationStrategies(data);
  return result;
}

export async function getPersonalizedInsightsAction(
  data: GeneratePersonalizedTaxInsightsInput
) {
  const result = await generatePersonalizedTaxInsights(data);
  return result;
}

export async function executeFormulaAction(
  formula: string,
  context: Record<string, any>
) {
  const formulaEngine = new FormulaEngine();
  const result = formulaEngine.evaluate(formula, context);
  return result;
}
