
import { CalculatorCard } from "@/components/calculator-card";
import { RetirementPlannerForm } from "@/components/retirement-planner-form";
import { Users } from "lucide-react";

export default function RetirementPlannerPage() {
  return (
    <div className="flex flex-col items-center w-full">
      <CalculatorCard
        title="Retirement Planning Tool"
        description="Plan for your financial future by estimating your total savings at retirement. Input your current age, desired retirement age, current savings, monthly contributions, and expected return rate."
        icon={Users}
        className="max-w-3xl mx-auto"
      >
        <RetirementPlannerForm />
      </CalculatorCard>
    </div>
  );
}
