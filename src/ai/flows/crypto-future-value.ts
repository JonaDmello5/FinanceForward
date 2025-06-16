
'use server';

/**
 * @fileOverview This flow calculates the potential future value of a cryptocurrency investment.
 * It is designed to use a tool that can fetch live market data from the Gemini API.
 *
 * - cryptoFutureValue - A function that calculates the future value of a cryptocurrency investment.
 * - CryptoFutureValueInput - The input type for the cryptoFutureValue function.
 * - CryptoFutureValueOutput - The return type for the cryptoFutureValue function.
 */

import {ai}from '@/ai/genkit';
import {z} from 'genkit';
import axios from 'axios';

const CryptoFutureValueInputSchema = z.object({
  cryptoAmount: z
    .number()
    .describe('The amount of cryptocurrency to invest.'),
  cryptoTicker: z
    .enum(['BTC', 'ETH', 'SOL', 'ADA', 'DOGE', 'DOT', 'LINK', 'LTC', 'BCH', 'XLM', 'FIL', 'TRX', 'XMR', 'EOS'])
    .describe('The ticker symbol of the cryptocurrency (e.g., BTC, ETH, SOL, ADA, DOGE, DOT, LINK, LTC, BCH, XLM, FIL, TRX, XMR, EOS).'),
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

const getMockPrice = (ticker: string): number => {
  const tickerUpper = ticker.toUpperCase();
  if (tickerUpper === 'BTC') return 110000;
  if (tickerUpper === 'ETH') return 5500;
  if (tickerUpper === 'SOL') return 200;
  if (tickerUpper === 'ADA') return 0.80;
  if (tickerUpper === 'DOGE') return 0.15;
  if (tickerUpper === 'DOT') return 7.00;
  if (tickerUpper === 'LINK') return 15.00;
  if (tickerUpper === 'LTC') return 80.00;
  if (tickerUpper === 'BCH') return 400.00;
  if (tickerUpper === 'XLM') return 0.10;
  if (tickerUpper === 'FIL') return 5.00;
  if (tickerUpper === 'TRX') return 0.12;
  if (tickerUpper === 'XMR') return 120.00;
  if (tickerUpper === 'EOS') return 0.80;
  // Fallback for any unrecognized tickers not covered by live API or if API fails
  console.warn(`No mock price defined for ${ticker}, returning 1 as default.`);
  return 1;
};

const getCryptoPrice = ai.defineTool(
  {
    name: 'getCryptoPrice',
    description: 'Returns the current market value of a cryptocurrency in USD. Attempts to fetch live data from Gemini API, falls back to mock data if unavailable or if specific ticker is not on Gemini.',
    inputSchema: z.object({
      ticker: z.string().describe('The ticker symbol of the cryptocurrency (e.g., BTC, ETH).'),
    }),
    outputSchema: z.number(),
  },
  async (input) => {
    const tickerUpper = input.ticker.toUpperCase();
    const geminiSymbol = `${tickerUpper.toLowerCase()}usd`; // Gemini API uses symbols like 'btcusd', 'ethusd'

    try {
      const endpoint = `https://api.gemini.com/v1/pubticker/${geminiSymbol}`;
      console.log(`Attempting to fetch live price for ${tickerUpper} from Gemini: ${endpoint}`);
      const response = await axios.get(endpoint);
      if (response.data && response.data.last) {
        const price = parseFloat(response.data.last);
        console.log(`Successfully fetched live price for ${tickerUpper} from Gemini: ${price}`);
        return price;
      } else {
        console.warn(`Unexpected response structure from Gemini for ${tickerUpper}, though API call succeeded. Falling back to mock price.`);
        return getMockPrice(tickerUpper); // Fallback to mock if data.last is missing
      }
    } catch (error: any) {
      console.error(`Error fetching price for ${tickerUpper} from Gemini: ${error.message}. Status: ${error.response?.status}`);
      if (error.response?.status === 404) {
        console.warn(`Ticker ${geminiSymbol} not found on Gemini. Falling back to mock price for ${tickerUpper}.`);
      } else {
        console.warn(`Falling back to mock price for ${tickerUpper} due to API error during Gemini fetch.`);
      }
      return getMockPrice(tickerUpper); // Fallback to mock for any API error
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
  3. Assume a constant annual growth rate of 10% for the cryptocurrency from its current price for the future value calculation.
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
      // This fallback logic is a safety net if the AI model itself fails to produce the output,
      // even if the tool call was supposed to happen.
      let fallbackPrice = getMockPrice(input.cryptoTicker); // Default to mock
      try {
        // Attempt to get price directly if AI output is malformed, preferring live data if possible
        fallbackPrice = await getCryptoPrice({ticker: input.cryptoTicker});
      } catch (e) {
        console.error("Error in fallback price fetch during flow output validation (tool might have failed or AI didn't use it):", e);
        // If getCryptoPrice itself throws an error here, it means both live and mock fetch within it failed.
        // We'll use the initial getMockPrice result.
      }

      const fallbackFutureValue = input.cryptoAmount * fallbackPrice * Math.pow(1.10, input.investmentPeriod);
      console.warn("AI model did not return the expected output structure or tool call was problematic. Using fallback calculation with best-effort price.", { fallbackPrice, fallbackFutureValue });
      return {
        currentPriceUSD: fallbackPrice,
        futureValue: fallbackFutureValue,
      };
    }
    return output;
  }
);

