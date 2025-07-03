
import { CalculatorCard } from "@/components/calculator-card";
import { CryptoInvestmentForm } from "@/components/crypto-investment-form";
import { Bitcoin } from "lucide-react";
import { AdPlaceholder } from "@/components/ad-placeholder";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CryptoTrackerPage() {
  return (
    <div className="flex flex-col items-center w-full space-y-6">
      <AdPlaceholder variant="banner" label="Crypto Banner Ad (Above Form)" className="mb-6" />
      <CalculatorCard
        title="Cryptocurrency Investment Calculator"
        description="Project the potential future value of your cryptocurrency investments. Enter the amount of crypto, select the ticker, and specify the investment period to get an AI-powered estimation."
        icon={Bitcoin}
        className="max-w-3xl mx-auto"
      >
        <CryptoInvestmentForm />
      </CalculatorCard>

      <Card className="w-full max-w-3xl mx-auto mt-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-headline text-primary">How to Use and Interpret the Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-foreground/80">
          <p>
            Our Cryptocurrency Investment Calculator is a unique tool designed to provide speculative future value projections. Here’s a breakdown of how it works and what to keep in mind:
          </p>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How are the projections calculated?</AccordionTrigger>
              <AccordionContent className="text-foreground/80 space-y-2">
                <p>
                  The calculator uses a Genkit AI flow powered by a Gemini model. The flow takes your inputs (crypto amount, ticker, and period) and follows a two-step process:
                </p>
                <ol className="list-decimal list-inside pl-4 space-y-1">
                  <li><strong>Price Fetching:</strong> It first attempts to fetch the current, live market price for your selected cryptocurrency from the Gemini public API. If the API is unavailable or doesn't provide data for that specific coin, it falls back to a predefined mock price to ensure the tool remains functional.</li>
                  <li><strong>Future Value Calculation:</strong> The AI model then uses this price (whether live or mock) and applies a simplified annual growth formula: `Future Value = Amount * Price * (1 + 10%) ^ Years`. The 10% annual growth rate is a fixed assumption for this calculation.</li>
                </ol>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Why are these projections speculative?</AccordionTrigger>
              <AccordionContent className="text-foreground/80">
                Cryptocurrency markets are extremely volatile, and past performance is not indicative of future results. Our calculator uses a simplified model with a fixed hypothetical growth rate. It is an illustrative tool to demonstrate potential outcomes based on a set of assumptions, not a guarantee of future returns.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Important Considerations</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside text-foreground/80 space-y-2">
                  <li>This tool is for informational and educational purposes only.</li>
                  <li>The results should NOT be considered financial advice.</li>
                  <li>Always conduct your own thorough research (DYOR).</li>
                  <li>Consult with a qualified financial advisor before making any investment decisions.</li>
                  <li>The mock data fallback is a key feature to ensure usability, but it means not all projections are based on live market data.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
