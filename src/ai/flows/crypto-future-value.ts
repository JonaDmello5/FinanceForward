
'use server';

/**
 * @fileOverview This flow calculates the potential future value of a cryptocurrency investment.
 * It is designed to use a tool that can fetch live market data.
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
    .string() // Keep as string to allow any ticker, enum validation is in form
    .describe('The ticker symbol of the cryptocurrency (e.g., BTC, ETH, SOL, ADA).'),
  investmentPeriod: z
    .number()
    .describe('The investment period in years.'),
});
export type CryptoFutureValueInput = z.infer<typeof CryptoFutureValueInputSchema>;

const CryptoFutureValueOutputSchema = z.object({
  currentPriceUSD: z
    .number()
    .describe('The current market price of the cryptocurrency in USD, obtained from the getCryptoPrice tool.'),
  futureValue: z
    .number()
    .describe('The potential future value of the cryptocurrency investment in USD.'),
});
export type CryptoFutureValueOutput = z.infer<typeof CryptoFutureValueOutputSchema>;

export async function cryptoFutureValue(input: CryptoFutureValueInput): Promise<CryptoFutureValueOutput> {
  return cryptoFutureValueFlow(input);
}

const getCryptoPrice = ai.defineTool(
  {
    name: 'getCryptoPrice',
    description: 'Returns the current market value of a cryptocurrency in USD. This tool should be implemented to fetch live data from a cryptocurrency exchange API (e.g., Gemini API).',
    inputSchema: z.object({
      ticker: z.string().describe('The ticker symbol of the cryptocurrency.'),
    }),
    outputSchema: z.number(),
  },
  async (input) => {
    // DEVELOPER TODO: Replace the mock implementation below with a real API call to fetch live cryptocurrency prices.
    // For example, you could use the Gemini API, CoinGecko API, or another cryptocurrency data provider.
    // You would typically use 'fetch' or a library like 'axios' or a dedicated API client here.
    // Remember to:
    // 1. Securely manage any required API keys (e.g., using environment variables).
    // 2. Handle potential network errors, API rate limits, and data parsing issues.
    // 3. Ensure the data returned matches the 'outputSchema' (a number representing the price in USD).

    console.warn(
      `DEVELOPER NOTICE: The 'getCryptoPrice' tool is currently using MOCK data for ${input.ticker}. ` +
      `For live data, please implement an API call as per the comments in src/ai/flows/crypto-future-value.ts.`
    );

    // Current MOCK price implementation (for demonstration purposes):
    const tickerUpper = input.ticker.toUpperCase();
    if (tickerUpper === 'BTC') {
      return 110000; // Mock Bitcoin price (USD)
    } else if (tickerUpper === 'ETH') {
      return 5500; // Mock Ethereum price (USD)
    } else if (tickerUpper === 'SOL') {
      return 200; // Mock Solana price (USD)
    } else if (tickerUpper === 'ADA') {
      return 0.80; // Mock Cardano price (USD)
    } else {
      // For "OTHER" or any unrecognized tickers, return a generic low mock price.
      // In a live implementation, you might want to return an error or a specific handling for unsupported tickers.
      return 1;
    }
  }
);

const prompt = ai.definePrompt({
  name: 'cryptoFutureValuePrompt',
  input: {schema: CryptoFutureValueInputSchema},
  output: {schema: CryptoFutureValueOutputSchema},
  tools: [getCryptoPrice],
  prompt: `You are a financial advisor specializing in cryptocurrency investments.

  The user wants to know the potential future value of their cryptocurrency investment and the current price used for the calculation.
  You have access to a tool that provides cryptocurrency prices. It is crucial to use this tool to get the current price.
  
  Input:
  Cryptocurrency Amount: {{{cryptoAmount}}}
  Cryptocurrency Ticker: {{{cryptoTicker}}}
  Investment Period (years): {{{investmentPeriod}}}
  
  Procedure:
  1. Invoke the 'getCryptoPrice' tool with the 'cryptoTicker' to get its current market price in USD.
  2. Store this current market price. This will be used for the 'currentPriceUSD' field in your output.
  3. Assume a constant annual growth rate of 10% for the cryptocurrency from its current price.
  4. Calculate the future value of the investment using the formula: futureValue = cryptoAmount * currentPriceFromTool * (1 + 0.10)^investmentPeriod.
     The 'currentPriceFromTool' is the value returned by the getCryptoPrice tool in step 1.
     The 'futureValue' should be the total USD value after the investment period.
  5. Populate the 'currentPriceUSD' field in your output with the price obtained in step 1.
  6. Populate the 'futureValue' field in your output with the value calculated in step 4.
  
  Return the current price and the calculated future value in the format specified in the output schema.
  Ensure you call the 'getCryptoPrice' tool.
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
    if (!output || typeof output.futureValue === 'undefined' || typeof output.currentPriceUSD === 'undefined') {
      throw new Error("The AI model did not return the expected output (futureValue and currentPriceUSD) for crypto future value.");
    }
    return output;
  }
);
