'use server';
/**
 * @fileOverview An AI-powered tax calculation flow.
 *
 * - calculateTaxWithAI - A function that takes tax data and calculation type as input and returns the tax calculation results.
 * - CalculateTaxWithAIInput - The input type for the calculateTaxWithAI function.
 * - CalculateTaxWithAIOutput - The return type for the calculateTaxWithAI function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CalculateTaxWithAIInputSchema = z.object({
  taxData: z.any().describe('The tax data provided by the user.'),
  calculationType: z.string().describe('The type of tax calculation to perform (e.g., PAYE, VAT).'),
});
export type CalculateTaxWithAIInput = z.infer<typeof CalculateTaxWithAIInputSchema>;

const CalculateTaxWithAIOutputSchema = z.object({
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
export type CalculateTaxWithAIOutput = z.infer<typeof CalculateTaxWithAIOutputSchema>;

export async function calculateTaxWithAI(input: CalculateTaxWithAIInput): Promise<CalculateTaxWithAIOutput> {
  return calculateTaxWithAIFlow(input);
}

const calculateTaxWithAIPrompt = ai.definePrompt({
  name: 'calculateTaxWithAIPrompt',
  input: {schema: CalculateTaxWithAIInputSchema},
  output: {schema: CalculateTaxWithAIOutputSchema},
  prompt: `You are an AI-powered tax assistant specializing in Nigerian tax laws. 

You will receive tax data and a calculation type from the user. Use this information to perform a detailed tax calculation according to the latest tax laws and FIRS guidelines. Consider all applicable deductions, reliefs, and tax brackets.

Return the total tax payable, taxable income, take-home income, monthly tax, monthly income, effective tax rate, and a breakdown of the tax calculation. Also generate AI-powered recommendations for tax optimization based on the user's financial situation.

Tax Data: {{{taxData}}}
Calculation Type: {{{calculationType}}}

Ensure the output is accurate and complies with Nigerian tax regulations.`,
});

const calculateTaxWithAIFlow = ai.defineFlow(
  {
    name: 'calculateTaxWithAIFlow',
    inputSchema: CalculateTaxWithAIInputSchema,
    outputSchema: CalculateTaxWithAIOutputSchema,
  },
  async input => {
    const {output} = await calculateTaxWithAIPrompt(input);
    return output!;
  }
);
