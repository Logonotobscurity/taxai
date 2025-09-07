'use server';
/**
 * @fileOverview An AI agent that processes text based on a given action.
 *
 * - processText - A function that handles text processing.
 * - ProcessTextInput - The input type for the processText function.
 * - ProcessTextOutput - The return type for the processText function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ProcessTextInputSchema = z.object({
  text: z.string().describe('The text to be processed.'),
  action: z
    .enum(['Summarize', 'Proofread', 'Condense'])
    .describe('The action to perform on the text.'),
});
export type ProcessTextInput = z.infer<typeof ProcessTextInputSchema>;

const ProcessTextOutputSchema = z.object({
  processedText: z.string().describe('The resulting processed text.'),
});
export type ProcessTextOutput = z.infer<typeof ProcessTextOutputSchema>;

export async function processText(
  input: ProcessTextInput
): Promise<ProcessTextOutput> {
  return processTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'processTextPrompt',
  input: { schema: ProcessTextInputSchema },
  output: { schema: ProcessTextOutputSchema },
  prompt: `You are a helpful AI assistant. Perform the following action on the provided text.

Action: {{{action}}}

Text:
"""
{{{text}}}
"""

Return only the processed text in the output schema.`,
});

const processTextFlow = ai.defineFlow(
  {
    name: 'processTextFlow',
    inputSchema: ProcessTextInputSchema,
    outputSchema: ProcessTextOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
