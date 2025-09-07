'use server';
/**
 * @fileOverview An AI agent that can analyze documents and images.
 *
 * - analyzeDocument - A function that handles the document analysis process.
 * - AnalyzeDocumentInput - The input type for the analyzeDocument function.
 * - AnalyzeDocumentOutput - The return type for the analyzeDocument function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AnalyzeDocumentInputSchema = z.object({
  documentDataUri: z
    .string()
    .describe(
      "A document or image file, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  query: z.string().describe('The user question or instruction about the document.'),
});
export type AnalyzeDocumentInput = z.infer<typeof AnalyzeDocumentInputSchema>;

const AnalyzeDocumentOutputSchema = z.object({
  analysis: z.string().describe('The AI-generated analysis or answer about the document.'),
});
export type AnalyzeDocumentOutput = z.infer<typeof AnalyzeDocumentOutputSchema>;

export async function analyzeDocument(
  input: AnalyzeDocumentInput
): Promise<AnalyzeDocumentOutput> {
  return analyzeDocumentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeDocumentPrompt',
  input: { schema: AnalyzeDocumentInputSchema },
  output: { schema: AnalyzeDocumentOutputSchema },
  prompt: `You are a helpful AI assistant. Analyze the provided document/image and answer the user's question.

User Question: "{{{query}}}"

Document/Image:
{{media url=documentDataUri}}

Provide your analysis now.`,
});

const analyzeDocumentFlow = ai.defineFlow(
  {
    name: 'analyzeDocumentFlow',
    inputSchema: AnalyzeDocumentInputSchema,
    outputSchema: AnalyzeDocumentOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
