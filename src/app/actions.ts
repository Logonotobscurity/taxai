'use server';

import { calculateTaxWithRules } from '@/ai/flows/calculate-tax-with-rules';
import { generatePersonalizedTaxInsights } from '@/ai/flows/generate-personalized-tax-insights';
import { proposeTaxOptimizationStrategies } from '@/ai/flows/propose-tax-optimization-strategies';
import { generateFormulaFromNL } from '@/ai/flows/generate-formula-from-nl';
import type { z } from 'zod';
import type { ProposeTaxOptimizationStrategiesInput } from '@/ai/flows/propose-tax-optimization-strategies';
import type { GeneratePersonalizedTaxInsightsInput } from '@/ai/flows/generate-personalized-tax-insights';
import type { TaxFormSchema } from '@/lib/schemas';
import { FormulaEngine } from '@/services/formula-engine';
import { TaxRulesEngine } from '@/services/tax-rules-engine';
import { JudicialPrecedentSystem } from '@/services/judicial-precedent-system';
import { TaxCalculationService } from '@/services/tax-calculation-service';
import {
  processText,
  type ProcessTextInput,
} from '@/ai/flows/process-text-flow';

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

  const result = await calculateTaxWithRules({
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

export async function getTaxRulesAction(taxYear: string) {
  const rulesEngine = new TaxRulesEngine();
  await rulesEngine.loadRules(taxYear);
  const rules: any[] = [];
  rulesEngine.rules.forEach((rule, key) => {
    // Convert dates to string to ensure they are serializable
    rules.push({
      id: key,
      ...rule,
      effectiveDate: rule.effectiveDate.toISOString(),
      expirationDate: rule.expirationDate
        ? rule.expirationDate.toISOString()
        : null,
    });
  });
  return rules;
}

export async function getPrecedentsForRuleAction(ruleName: string) {
  const precedentSystem = new JudicialPrecedentSystem();
  const precedents = precedentSystem.getPrecedentsForRule(ruleName);
  // Convert dates to string to ensure they are serializable
  return precedents.map((p) => ({
    ...p,
    decisionDate: p.decisionDate.toISOString(),
  }));
}

export async function generateFormulaAction(
  naturalLanguage: string,
  context: Record<string, any>
) {
  const result = await generateFormulaFromNL({ naturalLanguage, context });
  return result;
}

export async function processTextAction(data: ProcessTextInput) {
  const result = await processText(data);
  return result;
}
