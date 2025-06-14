'use server';
/**
 * @fileOverview Generates the content for the About Us page of FinanceForward, including a mission statement
 *  and details on how calculations are made and the Gemini API is used.
 *
 * - generateAboutUsContent - A function that generates the about us content.
 * - AboutUsContentInput - The input type for the generateAboutUsContent function.
 * - AboutUsContentOutput - The return type for the generateAboutUsContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AboutUsContentInputSchema = z.object({
  missionStatementKeywords: z
    .string()
    .describe(
      'Keywords to guide the mission statement, such as financial planning, ease of use, traditional finance, and cryptocurrency.'
    ),
  calculationExplanationsRequest: z
    .string()
    .describe('Request for explanation on the logic of the financial calculations.'),
  geminiApiUsageDetailsRequest: z
    .string()
    .describe(
      'Request for details on how the Gemini API is used for cryptocurrency data.'
    ),
});
export type AboutUsContentInput = z.infer<typeof AboutUsContentInputSchema>;

const AboutUsContentOutputSchema = z.object({
  missionStatement: z
    .string()
    .describe('A mission statement for FinanceForward.'),
  calculationExplanations: z
    .string()
    .describe('Explanations of the financial calculations used.'),
  geminiApiUsageDetails: z
    .string()
    .describe('Details on how the Gemini API is used for cryptocurrency data.'),
});
export type AboutUsContentOutput = z.infer<typeof AboutUsContentOutputSchema>;

export async function generateAboutUsContent(
  input: AboutUsContentInput
): Promise<AboutUsContentOutput> {
  return generateAboutUsContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'financeForwardAboutUsPrompt',
  input: {schema: AboutUsContentInputSchema},
  output: {schema: AboutUsContentOutputSchema},
  prompt: `You are tasked with generating content for the About Us page of FinanceForward, a financial calculator website.

Generate a mission statement based on the following keywords: {{{missionStatementKeywords}}}.

Explain the financial calculations based on: {{{calculationExplanationsRequest}}}.

Detail how the Gemini API is used for cryptocurrency data based on: {{{geminiApiUsageDetailsRequest}}}.

Mission Statement:
{{missionStatement}}

Calculation Explanations:
{{calculationExplanations}}

Gemini API Usage Details:
{{geminiApiUsageDetails}}`,
});

const generateAboutUsContentFlow = ai.defineFlow(
  {
    name: 'generateAboutUsContentFlow',
    inputSchema: AboutUsContentInputSchema,
    outputSchema: AboutUsContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
