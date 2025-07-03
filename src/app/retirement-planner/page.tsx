
import { CalculatorCard } from "@/components/calculator-card";
import { RetirementPlannerForm } from "@/components/retirement-planner-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function RetirementPlannerPage() {
  return (
    <div className="flex flex-col items-center w-full space-y-6">
      <CalculatorCard
        title="Retirement Planning Tool"
        description="Plan for your financial future by estimating your total savings at retirement. Input your current age, desired retirement age, current savings, monthly contributions, and expected return rate."
        icon={Users}
        className="max-w-3xl mx-auto"
      >
        <RetirementPlannerForm />
      </CalculatorCard>

       <Card className="w-full max-w-3xl mx-auto mt-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-headline text-primary">How Our Retirement Planner Works</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-foreground/80">
            Planning for retirement involves understanding how your savings can grow over a long period. This tool simplifies the process by projecting your financial future based on a few key inputs.
          </p>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How is my final savings amount calculated?</AccordionTrigger>
              <AccordionContent className="text-foreground/80 space-y-2">
                <p>The calculator performs two main calculations and adds them together:</p>
                <ol className="list-decimal list-inside pl-2 space-y-1">
                  <li><strong>Growth of Current Savings:</strong> It calculates the future value of your existing savings by applying the expected annual return rate over the number of years until you retire.</li>
                  <li><strong>Growth of Future Contributions:</strong> It calculates the future value of all your future monthly contributions, treating them as a growing annuity. This also uses your expected return rate.</li>
                </ol>
                <p>The sum of these two values gives you an estimate of your total retirement nest egg.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What does "Expected Annual Return Rate" mean?</AccordionTrigger>
              <AccordionContent className="text-foreground/80">
                This is the average annual percentage you expect your investments to earn. It's a crucial variable in your retirement plan. For example, a diversified portfolio of stocks and bonds might have a historical average return of 5-8% per year. Conservative investments might yield less, while more aggressive strategies might aim for more (with higher risk). It's important to choose a realistic number based on your investment strategy and risk tolerance.
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-3">
              <AccordionTrigger>Why is starting early so important?</AccordionTrigger>
              <AccordionContent className="text-foreground/80">
                The power of compound interest means that the longer your money is invested, the more time it has to grow. Even small, regular contributions made early in your career can grow into very large sums over several decades. Use the calculator to see the difference between starting at age 25 versus age 35—the results can be dramatic and highlight the importance of time in investing.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
