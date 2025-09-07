'use server';
/**
 * @fileOverview An AI agent that converts natural language descriptions into Excel-like formulas.
 *
 * - generateFormulaFromNL - A function that takes a natural language query and context to generate a formula.
 * - GenerateFormulaFromNLInput - The input type for the generateFormulaFromNL function.
 * - GenerateFormulaFromNLOutput - The return type for the generateFormulaFromNL function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateFormulaFromNLInputSchema = z.object({
  naturalLanguage: z.string().describe('The natural language description of the calculation.'),
  context: z.any().describe('The available data context (variables) for the formula.'),
});
export type GenerateFormulaFromNLInput = z.infer<typeof GenerateFormulaFromNLInputSchema>;

const GenerateFormulaFromNLOutputSchema = z.object({
  formula: z.string().describe('The generated Excel-like formula.'),
  explanation: z.string().describe('A brief explanation of how the formula works.'),
  confidence: z.number().describe('The confidence score (0.0 to 1.0) in the generated formula.'),
  variables: z.array(z.string()).describe('A list of variables used from the context.'),
});
export type GenerateFormulaFromNLOutput = z.infer<typeof GenerateFormulaFromNLOutputSchema>;

export async function generateFormulaFromNL(
  input: GenerateFormulaFromNLInput
): Promise<GenerateFormulaFromNLOutput> {
  return generateFormulaFromNLFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFormulaFromNLPrompt',
  input: { schema: GenerateFormulaFromNLInputSchema },
  output: { schema: GenerateFormulaFromNLOutputSchema },
  prompt: `You are an expert at converting natural language financial requests into Excel-like formulas for a tax calculation engine.

Convert the following natural language description to an Excel-like formula. Use only the available functions and context variables provided.

Description: "{{{naturalLanguage}}}"

Available functions:
- SUM(...args): Adds a series of numbers.
- AVG(...args): Averages a series of numbers.
- MAX(...args): Returns the largest number in a series.
- MIN(...args): Returns the smallest number in a series.
- ROUND(number, decimals): Rounds a number to a specified number of decimal places.
- CALCULATE_PAYE(income, deductions): Calculates Pay-As-You-Earn tax. 'deductions' is an object like { pension: 100, nhf: 50 }.
- CALCULATE_VAT(amount, category): Calculates Value Added Tax.

Available Context Variables:
{{#each (Object.keys context)}}
- {{{this}}}
{{/each}}

Respond with a JSON object matching the output schema. Ensure the 'formula' is valid and only uses the functions and variables listed above.`,
});

const generateFormulaFromNLFlow = ai.defineFlow(
  {
    name: 'generateFormulaFromNLFlow',
    inputSchema: GenerateFormulaFromNLInputSchema,
    outputSchema: GenerateFormulaFromNLOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
