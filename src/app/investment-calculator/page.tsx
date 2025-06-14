
import { CalculatorCard } from "@/components/calculator-card";
import { InvestmentCalculatorForm } from "@/components/investment-calculator-form";
import { Briefcase } from "lucide-react";

export default function InvestmentCalculatorPage() {
  return (
    <div className="flex flex-col items-center w-full">
      <CalculatorCard
        title="Investment Calculator"
        description="Estimate the future value of your investments. Enter your principal amount, interest rate, investment period, and compounding frequency to see how your money can grow over time."
        icon={Briefcase}
        className="max-w-3xl mx-auto"
      >
        <InvestmentCalculatorForm />
      </CalculatorCard>
    </div>
  );
}
