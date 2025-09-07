// 'use server';

/**
 * @fileOverview A tax optimization AI agent.
 *
 * - proposeTaxOptimizationStrategies - A function that proposes tax optimization strategies.
 * - ProposeTaxOptimizationStrategiesInput - The input type for the proposeTaxOptimizationStrategies function.
 * - ProposeTaxOptimizationStrategiesOutput - The return type for the proposeTaxOptimizationStrategies function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProposeTaxOptimizationStrategiesInputSchema = z.object({
  income: z.number().describe('The user\u2019s annual income.'),
  taxYear: z.string().describe('The tax year for which to provide strategies.'),
  employmentType: z.string().describe('The user\u2019s employment type.'),
  deductions: z.object({
    pension: z.number().optional().describe('The user\u2019s pension contributions.'),
    nhf: z.number().optional().describe('The user\u2019s NHF contributions.'),
    nhis: z.number().optional().describe('The user\u2019s NHIS contributions.'),
    lifeInsurance: z.number().optional().describe('The user\u2019s life insurance premiums.'),
    gratuity: z.number().optional().describe('The user\u2019s gratuity payments.'),
  }).optional().describe('The user\u2019s deductions.'),
  allowances: z.object({
    transport: z.number().optional().describe('The user\u2019s transport allowance.'),
    housing: z.number().optional().describe('The user\u2019s housing allowance.'),
    utility: z.number().optional().describe('The user\u2019s utility allowance.'),
    meal: z.number().optional().describe('The user\u2019s meal allowance.'),
  }).optional().describe('The user\u2019s allowances.'),
});
export type ProposeTaxOptimizationStrategiesInput = z.infer<
  typeof ProposeTaxOptimizationStrategiesInputSchema
>;

const ProposeTaxOptimizationStrategiesOutputSchema = z.object({
  strategies: z
    .array(z.string())
    .describe('A list of clear, actionable tax optimization strategies.'),
});
export type ProposeTaxOptimizationStrategiesOutput = z.infer<
  typeof ProposeTaxOptimizationStrategiesOutputSchema
>;

export async function proposeTaxOptimizationStrategies(
  input: ProposeTaxOptimizationStrategiesInput
): Promise<ProposeTaxOptimizationStrategiesOutput> {
  return proposeTaxOptimizationStrategiesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'proposeTaxOptimizationStrategiesPrompt',
  input: {schema: ProposeTaxOptimizationStrategiesInputSchema},
  output: {schema: ProposeTaxOptimizationStrategiesOutputSchema},
  prompt: `Given the following financial information, propose clear, actionable tax optimization strategies with detailed, step-by-step instructions:

Income: {{income}}
Tax Year: {{taxYear}}
Employment Type: {{employmentType}}
Deductions: {{deductions}}
Allowances: {{allowances}}

Strategies:`,
});

const proposeTaxOptimizationStrategiesFlow = ai.defineFlow(
  {
    name: 'proposeTaxOptimizationStrategiesFlow',
    inputSchema: ProposeTaxOptimizationStrategiesInputSchema,
    outputSchema: ProposeTaxOptimizationStrategiesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
