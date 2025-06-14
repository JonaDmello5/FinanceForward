
import { CalculatorCard } from "@/components/calculator-card";
import { LoanCalculatorForm } from "@/components/loan-calculator-form";
import { Landmark } from "lucide-react";
import { AdPlaceholder } from "@/components/ad-placeholder";

export default function LoanCalculatorPage() {
  return (
    <div className="flex flex-col items-center w-full space-y-6">
      <AdPlaceholder variant="banner" label="Banner Ad (Above Fold)" className="mb-6" />
      <CalculatorCard
        title="Loan Calculator"
        description="Calculate your periodic loan payments, total interest, and view a detailed amortization schedule. Adjust loan amount, interest rate, tenure, and repayment frequency to see how they impact your payments."
        icon={Landmark}
        className="max-w-3xl mx-auto"
      >
        <LoanCalculatorForm />
      </CalculatorCard>
    </div>
  );
}
