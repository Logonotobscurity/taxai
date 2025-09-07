'use server';
/**
 * @fileOverview An AI-powered tax calculation flow that uses a deterministic rules engine for calculations
 * and an LLM for qualitative recommendations.
 *
 * - calculateTaxWithRules - A function that takes tax data, calculates tax using the rules engine, and generates AI recommendations.
 * - CalculateTaxWithRulesInput - The input type for the function.
 * - CalculateTaxWithRulesOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { TaxRulesEngine } from '@/services/tax-rules-engine';
import { TaxCalculationService } from '@/services/tax-calculation-service';

const CalculateTaxWithRulesInputSchema = z.object({
  taxData: z.any().describe('The tax data provided by the user, including income, deductions, etc.'),
  calculationType: z.string().describe('The type of tax calculation to perform (e.g., PAYE, VAT).'),
});
export type CalculateTaxWithRulesInput = z.infer<typeof CalculateTaxWithRulesInputSchema>;

const CalculateTaxWithRulesOutputSchema = z.object({
  totalTax: z.number().describe('The total tax amount to be paid.'),
  taxableIncome: z.number().describe('The income amount subject to tax.'),
  takeHome: z.number().describe('The remaining income after tax deductions.'),
  monthlyTax: z.number().describe('The monthly tax amount.'),
  monthlyIncome: z.number().describe('The monthly income amount.'),
  effectiveRate: z.number().describe('The effective tax rate.'),
  pensionDeduction: z.number().describe('The pension deduction amount.'),
  nhfDeduction: z.number().describe('The NHF deduction amount.'),
  annualRelief: z.number().describe('The annual relief amount.'),
  taxBrackets: z.array(z.object({
    range: z.string().describe('The income range for the tax bracket.'),
    rate: z.number().describe('The tax rate for the bracket.'),
    tax: z.number().describe('The tax amount for the bracket.'),
  })).describe('The tax brackets used in the calculation.'),
  aiRecommendations: z.array(z.string()).describe('AI-powered recommendations for tax optimization.'),
});
export type CalculateTaxWithRulesOutput = z.infer<typeof CalculateTaxWithRulesOutputSchema>;

export async function calculateTaxWithRules(input: CalculateTaxWithRulesInput): Promise<CalculateTaxWithRulesOutput> {
  return calculateTaxWithRulesFlow(input);
}

const recommendationsPrompt = ai.definePrompt({
  name: 'generateTaxRecommendationsPrompt',
  input: { schema: z.object({ calculationResults: CalculateTaxWithRulesOutputSchema }) },
  output: { schema: z.object({ recommendations: z.array(z.string()) }) },
  prompt: `You are an AI-powered tax assistant specializing in Nigerian tax laws. 
  
Review the following tax calculation results for a user. Based on their financial situation as reflected in these numbers, provide 2-3 clear, actionable, and personalized recommendations for tax optimization.

Focus on strategies they might not be aware of, such as voluntary contributions, tax-efficient investments, or specific reliefs they might qualify for.

Calculation Results:
- Total Tax: {{{calculationResults.totalTax}}}
- Taxable Income: {{{calculationResults.taxableIncome}}}
- Take Home Pay: {{{calculationResults.takeHome}}}
- Pension Deductions: {{{calculationResults.pensionDeduction}}}
- NHF Deductions: {{{calculationResults.nhfDeduction}}}

Generate the recommendations now.`,
});

const calculateTaxWithRulesFlow = ai.defineFlow(
  {
    name: 'calculateTaxWithRulesFlow',
    inputSchema: CalculateTaxWithRulesInputSchema,
    outputSchema: CalculateTaxWithRulesOutputSchema,
  },
  async ({ taxData, calculationType }) => {
    // Step 1: Perform deterministic calculation using the rules engine
    const rulesEngine = new TaxRulesEngine();
    await rulesEngine.loadRules(taxData.taxYear);
    const taxService = new TaxCalculationService(rulesEngine);

    let calculationResults;
    if (calculationType.toLowerCase() === 'paye') {
      calculationResults = taxService.calculatePAYE({
        income: taxData.income,
        deductions: taxData.deductions,
      });
    } else {
      // Placeholder for other calculation types like VAT, WHT
      throw new Error(`Calculation type "${calculationType}" is not yet supported.`);
    }

    // Step 2: Use AI to generate qualitative recommendations based on the results
    const { output } = await recommendationsPrompt({ calculationResults });
    const aiRecommendations = output?.recommendations || [];

    // Step 3: Combine results and return
    return {
      ...calculationResults,
      aiRecommendations,
    };
  }
);
