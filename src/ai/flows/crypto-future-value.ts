
'use server';

/**
 * @fileOverview This flow calculates the potential future value of a cryptocurrency investment.
 * It attempts to fetch live market data from the Gemini API and falls back to mock prices if needed.
 *
 * - cryptoFutureValue - A function that calculates the future value of a cryptocurrency investment.
 * - CryptoFutureValueInput - The input type for the cryptoFutureValue function.
 * - CryptoFutureValueOutput - The return type for the cryptoFutureValue function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import axios from 'axios';

const CryptoFutureValueInputSchema = z.object({
  cryptoAmount: z.number().describe('Amount of cryptocurrency to invest.'),
  cryptoTicker: z.enum([
    'BTC', 'ETH', 'SOL', 'ADA', 'DOGE', 'DOT', 'LINK', 'LTC',
    'BCH', 'XLM', 'FIL', 'TRX', 'XMR', 'EOS'
  ]).describe('Ticker symbol of the cryptocurrency.'),
  investmentPeriod: z.number().describe('Investment period in years.'),
});
export type CryptoFutureValueInput = z.infer<typeof CryptoFutureValueInputSchema>;

const CryptoFutureValueOutputSchema = z.object({
  currentPriceUSD: z.number().describe('Current market price in USD.'),
  futureValue: z.number().describe('Future investment value in USD.'),
});
export type CryptoFutureValueOutput = z.infer<typeof CryptoFutureValueOutputSchema>;

// Local fallback values
const mockPrices: Record<string, number> = {
  BTC: 110000, ETH: 5500, SOL: 200, ADA: 0.80, DOGE: 0.15, DOT: 7.00,
  LINK: 15.00, LTC: 80.00, BCH: 400.00, XLM: 0.10, FIL: 5.00, TRX: 0.12,
  XMR: 120.00, EOS: 0.80,
};

const getCryptoPrice = ai.defineTool(
  {
    name: 'getCryptoPrice',
    description: 'Returns the current market value of a cryptocurrency in USD. Attempts to fetch live data from Gemini API, falls back to mock data if unavailable or if specific ticker is not on Gemini.',
    inputSchema: z.object({
      ticker: z.string().describe('Crypto ticker symbol (e.g., BTC, ETH).'),
    }),
    outputSchema: z.number(),
  },
  async ({ ticker }) => {
    const symbol = `${ticker.toLowerCase()}usd`; // Gemini API uses symbols like 'btcusd', 'ethusd'
    const url = `https://api.gemini.com/v1/pubticker/${symbol}`;
    try {
      console.log(`getCryptoPrice: Attempting to fetch live price for ${ticker} from Gemini: ${url}`);
      const { data } = await axios.get(url);
      const livePrice = parseFloat(data?.last);
      if (!isNaN(livePrice) && livePrice > 0) { // Added check for positive price
        console.log(`getCryptoPrice: Successfully fetched live price for ${ticker} from Gemini: ${livePrice}`);
        return livePrice;
      }
      console.warn(`getCryptoPrice: Missing, invalid, or non-positive price from Gemini for ${ticker}. Response data:`, data);
      // Explicitly throw to use the catch block's fallback logic
      throw new Error(`Missing, invalid, or non-positive price from Gemini for ${ticker}. Last price: ${data?.last}`);
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        console.warn(`getCryptoPrice: Gemini API request for ${ticker} (${url}) failed with status ${err.response.status}. Will attempt fallback to mock price.`);
      } else {
        console.warn(`getCryptoPrice: Fallback to mock price for ${ticker} due to general error fetching from ${url}: ${(err as Error).message}`);
      }
      
      const fallbackPrice = mockPrices[ticker.toUpperCase()];
      if (fallbackPrice !== undefined) {
        console.log(`getCryptoPrice: Using mock price for ${ticker}: ${fallbackPrice}`);
        return fallbackPrice;
      }
      // Ultimate fallback if ticker is not even in mockPrices
      console.error(`getCryptoPrice: No mock price defined for ${ticker}, returning 1 as default to prevent calculation errors.`);
      return 1; 
    }
  }
);

const prompt = ai.definePrompt({
  name: 'cryptoFutureValuePrompt',
  input: { schema: CryptoFutureValueInputSchema },
  output: { schema: CryptoFutureValueOutputSchema },
  tools: [getCryptoPrice],
  prompt: `
You are a crypto investment advisor. You are given the amount of cryptocurrency, its ticker, and the investment period in years.

Your task is to:
1. Use the 'getCryptoPrice' tool to fetch the current live market price in USD for the provided 'cryptoTicker'. This price is essential and must be obtained through the tool. Store this as 'currentPriceUSD'.
2. Calculate the 'futureValue' of the investment. Use the formula: futureValue = cryptoAmount * currentPriceUSD * (1 + 0.10)^investmentPeriod. Assume an annual growth rate of 10%.
3. Return an object containing both 'currentPriceUSD' (the value obtained from the tool) and the calculated 'futureValue'.

Input Details:
- cryptoAmount: {{{cryptoAmount}}}
- cryptoTicker: {{{cryptoTicker}}}
- investmentPeriod: {{{investmentPeriod}}}

Ensure you correctly use the 'getCryptoPrice' tool for the current price and perform the future value calculation as specified.
  `
});

const cryptoFutureValueFlow = ai.defineFlow(
  {
    name: 'cryptoFutureValueFlow',
    inputSchema: CryptoFutureValueInputSchema,
    outputSchema: CryptoFutureValueOutputSchema,
  },
  async (input) => {
    console.log("CryptoFutureValueFlow invoked with input:", input);
    const { output, history } = await prompt(input);
    
    console.log("CryptoFutureValueFlow: AI Model raw output from prompt:", output);
    if (history) {
      history.forEach(event => {
        if (event.type === 'toolRequest') {
          console.log("CryptoFutureValueFlow: AI requested tool:", event.request.toolName, "with input:", event.request.input);
        }
        if (event.type === 'toolResponse') {
          console.log("CryptoFutureValueFlow: Tool responded to:", event.response.toolName, "with output:", event.response.output);
        }
      });
    }

    if (!output || typeof output.futureValue === 'undefined' || typeof output.currentPriceUSD === 'undefined' || isNaN(output.futureValue) || isNaN(output.currentPriceUSD) || output.currentPriceUSD <= 0) {
      console.warn(`CryptoFutureValueFlow: AI model did not return the expected output structure for ${input.cryptoTicker}, currentPriceUSD was invalid, or tool call was problematic. Attempting direct fallback calculation.`);
      
      let fallbackPrice = 1; 
      try {
        console.log(`CryptoFutureValueFlow: Fallback - directly calling getCryptoPrice for ${input.cryptoTicker}`);
        fallbackPrice = await getCryptoPrice({ ticker: input.cryptoTicker }); // This will re-attempt live, then mock
        console.log(`CryptoFutureValueFlow: Fallback - getCryptoPrice returned: ${fallbackPrice}`);
      } catch(e) {
         console.error("CryptoFutureValueFlow: Fallback - Error in direct getCryptoPrice call:", e);
         fallbackPrice = mockPrices[input.cryptoTicker.toUpperCase()] ?? 1; // Use mock price or 1 if error during direct call
         console.log(`CryptoFutureValueFlow: Fallback - Using hardcoded mock price or default '1' after error in direct call: ${fallbackPrice}`);
      }
      
      // Ensure fallbackPrice is positive before calculation
      if (fallbackPrice <= 0) {
        console.warn(`CryptoFutureValueFlow: Fallback price for ${input.cryptoTicker} is ${fallbackPrice}, which is not positive. Using default 1 for calculation.`);
        fallbackPrice = 1;
      }

      const fallbackFutureValue = input.cryptoAmount * fallbackPrice * Math.pow(1.10, input.investmentPeriod);

      console.warn(`CryptoFutureValueFlow: Using fallback calculation for ${input.cryptoTicker}. Price: $${fallbackPrice}, Future Value: $${fallbackFutureValue.toFixed(2)}`);
      return {
        currentPriceUSD: fallbackPrice,
        futureValue: parseFloat(fallbackFutureValue.toFixed(2)),
      };
    }
    
    console.log(`CryptoFutureValueFlow: Successfully calculated by AI for ${input.cryptoTicker}. Current Price: $${output.currentPriceUSD}, Future Value: $${output.futureValue.toFixed(2)}`);
    return {
        currentPriceUSD: output.currentPriceUSD,
        futureValue: parseFloat(output.futureValue.toFixed(2)),
    };
  }
);

export async function cryptoFutureValue(input: CryptoFutureValueInput): Promise<CryptoFutureValueOutput> {
  return cryptoFutureValueFlow(input);
}

