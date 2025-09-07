'use server';
/**
 * @fileOverview A tax optimization AI agent that proposes strategies based on dynamic tax rules.
 *
 * - proposeTaxOptimizationStrategies - A function that proposes tax optimization strategies.
 * - ProposeTaxOptimizationStrategiesInput - The input type for the proposeTaxOptimizationStrategies function.
 * - ProposeTaxOptimizationStrategiesOutput - The return type for the proposeTaxOptimizationStrategies function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { TaxRulesEngine } from '@/services/tax-rules-engine';

// Tool to get applicable tax rules
const getApplicableTaxRules = ai.defineTool(
  {
    name: 'getApplicableTaxRules',
    description: 'Retrieves applicable tax rules based on the user profile.',
    inputSchema: z.object({
      taxYear: z.string().describe('The tax year for which to fetch rules.'),
      calculationType: z
        .string()
        .describe('The type of tax calculation (e.g., PAYE, VAT).'),
    }),
    outputSchema: z.any(),
  },
  async ({ taxYear, calculationType }) => {
    const rulesEngine = new TaxRulesEngine();
    await rulesEngine.loadRules(taxYear);
    const rules = rulesEngine.getRulesForCalculation(calculationType);
    // Return a simplified, serializable version of the rules
    return rules.map((rule) => ({
      name: rule.name,
      description: rule.description,
      source: rule.source,
    }));
  }
);

const ProposeTaxOptimizationStrategiesInputSchema = z.object({
  income: z.number().describe('The user’s annual income.'),
  taxYear: z.string().describe('The tax year for which to provide strategies.'),
  employmentType: z.string().describe('The user’s employment type.'),
  deductions: z
    .object({
      pension: z.number().optional().describe('The user’s pension contributions.'),
      nhf: z.number().optional().describe('The user’s NHF contributions.'),
      nhis: z.number().optional().describe('The user’s NHIS contributions.'),
      lifeInsurance: z.number().optional().describe('The user’s life insurance premiums.'),
      gratuity: z.number().optional().describe('The user’s gratuity payments.'),
    })
    .optional()
    .describe('The user’s deductions.'),
  allowances: z
    .object({
      transport: z.number().optional().describe('The user’s transport allowance.'),
      housing: z.number().optional().describe('The user’s housing allowance.'),
      utility: z.number().optional().describe('The user’s utility allowance.'),
      meal: z.number().optional().describe('The user’s meal allowance.'),
    })
    .optional()
    .describe('The user’s allowances.'),
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
  tools: [getApplicableTaxRules],
  input: { schema: ProposeTaxOptimizationStrategiesInputSchema },
  output: { schema: ProposeTaxOptimizationStrategiesOutputSchema },
  prompt: `You are an expert Nigerian tax advisor.
  
First, use the getApplicableTaxRules tool to fetch the relevant tax rules for the user's tax year and a calculation type of 'PAYE'.

Then, based on the user's financial information AND the specific tax rules provided by the tool, propose clear, actionable tax optimization strategies with detailed, step-by-step instructions. Each strategy should reference the specific tax rule it is based on.

User's Financial Information:
Income: {{income}}
Tax Year: {{taxYear}}
Employment Type: {{employmentType}}
Deductions: {{deductions}}
Allowances: {{allowances}}

Generate the strategies now.`,
});

const proposeTaxOptimizationStrategiesFlow = ai.defineFlow(
  {
    name: 'proposeTaxOptimizationStrategiesFlow',
    inputSchema: ProposeTaxOptimizationStrategiesInputSchema,
    outputSchema: ProposeTaxOptimizationStrategiesOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
