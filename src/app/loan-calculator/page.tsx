
import { CalculatorCard } from "@/components/calculator-card";
import { LoanCalculatorForm } from "@/components/loan-calculator-form";
import { Landmark } from "lucide-react";
import { AdPlaceholder } from "@/components/ad-placeholder";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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

      <Card className="w-full max-w-3xl mx-auto mt-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-headline text-primary">Understanding Your Loan</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-foreground/80">
            Taking out a loan is a significant financial commitment. Our loan calculator is designed to provide clarity by breaking down your potential repayment details. Understanding these numbers is the first step toward managing your debt effectively.
          </p>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How to Use This Calculator</AccordionTrigger>
              <AccordionContent className="text-foreground/80 space-y-2">
                <p>Follow these simple steps to get a detailed loan breakdown:</p>
                <ol className="list-decimal list-inside pl-2 space-y-1">
                  <li><strong>Select Currency:</strong> Choose the currency of your loan (USD or INR).</li>
                  <li><strong>Enter Loan Amount:</strong> The total amount of money you are borrowing.</li>
                  <li><strong>Provide Annual Interest Rate:</strong> The yearly interest rate on the loan.</li>
                  <li><strong>Set Loan Tenure:</strong> The total duration of the loan in years.</li>
                  <li><strong>Choose Repayment Frequency:</strong> How often you will make payments (monthly, bi-weekly, or weekly).</li>
                  <li>Click "Calculate Loan" to see your installment amount, total interest, and a full payment schedule.</li>
                </ol>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What is an Amortization Schedule?</AccordionTrigger>
              <AccordionContent className="text-foreground/80">
                The amortization schedule is a detailed table that shows the breakdown of each of your loan payments. For every payment, it lists how much of the money goes towards paying off the interest versus how much goes towards reducing your actual loan balance (the principal). It also shows the remaining loan balance after each payment, giving you a clear picture of your progress over the life of the loan.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How does loan tenure affect my payments?</AccordionTrigger>
              <AccordionContent className="text-foreground/80">
                The loan tenure has a significant impact on your payments. A <strong>shorter tenure</strong> means higher periodic payments, but you will pay less total interest over the life of the loan and become debt-free sooner. A <strong>longer tenure</strong> results in lower, more manageable periodic payments, but you will end up paying significantly more in total interest. Use the calculator to see this effect in action.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}

    