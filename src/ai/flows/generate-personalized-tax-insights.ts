'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating personalized tax insights and recommendations.
 *
 * The flow takes financial data and current financial news as input and provides tax optimization suggestions.
 * - generatePersonalizedTaxInsights - A function that handles the tax insights generation process.
 * - GeneratePersonalizedTaxInsightsInput - The input type for the generatePersonalizedTaxInsights function.
 * - GeneratePersonalizedTaxInsightsOutput - The return type for the generatePersonalizedTaxInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedTaxInsightsInputSchema = z.object({
  financialData: z.string().describe('The user financial data as a JSON string.'),
  financialNews: z.string().describe('The current financial news as a JSON string.'),
});
export type GeneratePersonalizedTaxInsightsInput = z.infer<typeof GeneratePersonalizedTaxInsightsInputSchema>;

const GeneratePersonalizedTaxInsightsOutputSchema = z.object({
  insights: z.string().describe('The personalized tax insights and recommendations.'),
});
export type GeneratePersonalizedTaxInsightsOutput = z.infer<typeof GeneratePersonalizedTaxInsightsOutputSchema>;

export async function generatePersonalizedTaxInsights(input: GeneratePersonalizedTaxInsightsInput): Promise<GeneratePersonalizedTaxInsightsOutput> {
  return generatePersonalizedTaxInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedTaxInsightsPrompt',
  input: {schema: GeneratePersonalizedTaxInsightsInputSchema},
  output: {schema: GeneratePersonalizedTaxInsightsOutputSchema},
  prompt: `You are an AI-powered financial advisor specializing in Nigerian tax regulations. Analyze the user's financial data and current financial news to provide personalized tax insights and recommendations.

Financial Data: {{{financialData}}}
Financial News: {{{financialNews}}}

Based on this information, provide specific recommendations to optimize their tax liabilities and improve their financial planning. The insights should be clear, actionable, and tailored to the user's situation.
`,
});

const generatePersonalizedTaxInsightsFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedTaxInsightsFlow',
    inputSchema: GeneratePersonalizedTaxInsightsInputSchema,
    outputSchema: GeneratePersonalizedTaxInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
