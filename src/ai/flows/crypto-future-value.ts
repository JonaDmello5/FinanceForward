'use server';

/**
 * @fileOverview This flow calculates the potential future value of a cryptocurrency investment based on live market data from the Gemini API.
 *
 * - cryptoFutureValue - A function that calculates the future value of a cryptocurrency investment.
 * - CryptoFutureValueInput - The input type for the cryptoFutureValue function.
 * - CryptoFutureValueOutput - The return type for the cryptoFutureValue function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CryptoFutureValueInputSchema = z.object({
  cryptoAmount: z
    .number()
    .describe('The amount of cryptocurrency to invest.'),
  cryptoTicker: z
    .string()
    .describe('The ticker symbol of the cryptocurrency (e.g., BTC, ETH).'),
  investmentPeriod: z
    .number()
    .describe('The investment period in years.'),
});
export type CryptoFutureValueInput = z.infer<typeof CryptoFutureValueInputSchema>;

const CryptoFutureValueOutputSchema = z.object({
  futureValue: z
    .number()
    .describe('The potential future value of the cryptocurrency investment.'),
});
export type CryptoFutureValueOutput = z.infer<typeof CryptoFutureValueOutputSchema>;

export async function cryptoFutureValue(input: CryptoFutureValueInput): Promise<CryptoFutureValueOutput> {
  return cryptoFutureValueFlow(input);
}

const getCryptoPrice = ai.defineTool(
  {
    name: 'getCryptoPrice',
    description: 'Returns the current market value of a cryptocurrency.',
    inputSchema: z.object({
      ticker: z.string().describe('The ticker symbol of the cryptocurrency.'),
    }),
    outputSchema: z.number(),
  },
  async (input) => {
    // In a real application, this would call the Gemini API to get the current price.
    // For this example, we'll return a mock price.
    if (input.ticker === 'BTC') {
      return 60000; // Mock Bitcoin price
    } else if (input.ticker === 'ETH') {
      return 3000; // Mock Ethereum price
    } else {
      return 1; // Mock price for other cryptocurrencies
    }
  }
);

const prompt = ai.definePrompt({
  name: 'cryptoFutureValuePrompt',
  input: {schema: CryptoFutureValueInputSchema},
  output: {schema: CryptoFutureValueOutputSchema},
  tools: [getCryptoPrice],
  prompt: `You are a financial advisor specializing in cryptocurrency investments.

  The user wants to know the potential future value of their cryptocurrency investment.
  You have access to a tool that provides real-time cryptocurrency prices.
  
  Consider the current price of the cryptocurrency, the amount invested, and the investment period to calculate the future value.
  
  Input:
  Cryptocurrency Amount: {{{cryptoAmount}}}
  Cryptocurrency Ticker: {{{cryptoTicker}}}
  Investment Period (years): {{{investmentPeriod}}}
  
  First, determine the current price of the cryptocurrency using the getCryptoPrice tool.
  Then, assume a constant annual growth rate of 10% for the cryptocurrency.
  Calculate the future value of the investment using the formula: futureValue = cryptoAmount * (1 + growthRate)^investmentPeriod.
  
  Return the calculated future value in the format specified in the output schema.
  
  Make sure to invoke the getCryptoPrice tool to get the current price. 
  `,
});

const cryptoFutureValueFlow = ai.defineFlow(
  {
    name: 'cryptoFutureValueFlow',
    inputSchema: CryptoFutureValueInputSchema,
    outputSchema: CryptoFutureValueOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
