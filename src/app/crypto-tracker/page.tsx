import { CalculatorCard } from "@/components/calculator-card";
import { CryptoInvestmentForm } from "@/components/crypto-investment-form";
import { Bitcoin } from "lucide-react";

export default function CryptoTrackerPage() {
  return (
    <div className="flex flex-col items-center w-full">
      <CalculatorCard
        title="Cryptocurrency Investment Calculator"
        description="Project the potential future value of your cryptocurrency investments. Enter the amount of crypto, select the ticker, and specify the investment period to get an AI-powered estimation."
        icon={Bitcoin}
        className="max-w-3xl mx-auto"
      >
        <CryptoInvestmentForm />
      </CalculatorCard>
       <div className="max-w-3xl mx-auto mt-8 p-6 bg-secondary/30 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-primary mb-2">Important Considerations</h3>
        <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1">
          <li>Cryptocurrency markets are highly volatile and predictions are speculative.</li>
          <li>The projections provided by this tool are based on a simplified model and mocked price data.</li>
          <li>This tool is for illustrative purposes only and should not be considered financial advice.</li>
          <li>Always do your own research (DYOR) and consult with a qualified financial advisor before making any investment decisions.</li>
        </ul>
      </div>
    </div>
  );
}
