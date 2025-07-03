
import { CalculatorCard } from "@/components/calculator-card";
import { InvestmentCalculatorForm } from "@/components/investment-calculator-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

export default function InvestmentCalculatorPage() {
  return (
    <div className="flex flex-col items-center w-full space-y-6">
      <CalculatorCard
        title="Investment Calculator"
        description="Estimate the future value of your investments. Enter your principal amount, interest rate, investment period, and compounding frequency to see how your money can grow over time."
        icon={Briefcase}
        className="max-w-3xl mx-auto"
      >
        <InvestmentCalculatorForm />
      </CalculatorCard>

      <Card className="w-full max-w-3xl mx-auto mt-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-headline text-primary">Understanding Your Investment Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-foreground/80">
            This tool helps you visualize the power of compound interest. By providing a few key details, you can see a projection of how your initial investment might grow over time.
          </p>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is Compound Interest?</AccordionTrigger>
              <AccordionContent className="text-foreground/80">
                Compound interest is the interest you earn on both your original principal and the accumulated interest from previous periods. It's often called "interest on interest" and is a crucial concept in wealth building, as it can significantly accelerate the growth of your savings and investments over time.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How does Compounding Frequency work?</AccordionTrigger>
              <AccordionContent className="text-foreground/80">
                This setting determines how often the interest is calculated and added to your principal. The more frequently interest is compounded, the faster your investment grows, as you start earning interest on your interest sooner.
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li><strong>Annually:</strong> Interest is calculated and added once per year.</li>
                  <li><strong>Semi-Annually:</strong> Interest is calculated twice per year.</li>
                  <li><strong>Quarterly:</strong> Interest is calculated four times per year.</li>
                  <li><strong>Monthly:</strong> Interest is calculated twelve times per year.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-3">
              <AccordionTrigger>How to Use This Calculator</AccordionTrigger>
              <AccordionContent className="text-foreground/80 space-y-2">
                <ol className="list-decimal list-inside pl-2 space-y-1">
                  <li><strong>Select Currency:</strong> Choose between USD and INR for your calculation.</li>
                  <li><strong>Principal Amount:</strong> Enter the initial amount of money you are investing.</li>
                  <li><strong>Annual Interest Rate:</strong> Input the expected annual rate of return for your investment.</li>
                  <li><strong>Investment Period:</strong> Specify the total number of years you plan to keep the money invested.</li>
                  <li><strong>Compounding Frequency:</strong> Select how often you want the interest to be compounded.</li>
                  <li>Click "Calculate Investment" to see your projected future value, principal, and total interest earned.</li>
                </ol>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
