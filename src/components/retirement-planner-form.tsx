
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { LOCAL_STORAGE_KEYS } from "@/lib/constants";
import type { RetirementFormData, RetirementResults, ResultItem } from "@/lib/types";
import { ResultsDisplay } from "./results-display";
import { useEffect, useState } from "react";
import { AdPlaceholder } from "./ad-placeholder";
import { Loader2 } from "lucide-react";

const retirementFormSchema = z.object({
  currentAge: z.coerce.number().min(18, "Current age must be at least 18.").max(99, "Current age seems too high."),
  retirementAge: z.coerce.number().min(19, "Retirement age must be greater than current age.").max(100, "Retirement age seems too high."),
  currentSavings: z.coerce.number().min(0, "Current savings cannot be negative."),
  monthlyContribution: z.coerce.number().min(0, "Monthly contribution cannot be negative."),
  expectedReturnRate: z.coerce.number().min(0, "Expected return rate cannot be negative.").max(50, "Expected return rate seems too high."),
}).refine(data => data.retirementAge > data.currentAge, {
  message: "Retirement age must be greater than current age.",
  path: ["retirementAge"],
});

const initialRetirementData: RetirementFormData = {
  currentAge: 30,
  retirementAge: 65,
  currentSavings: 50000,
  monthlyContribution: 500,
  expectedReturnRate: 7,
};

export function RetirementPlannerForm() {
  const [storedData, setStoredData] = useLocalStorage<RetirementFormData>(LOCAL_STORAGE_KEYS.RETIREMENT_PLANNER, initialRetirementData);
  const [results, setResults] = useState<RetirementResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RetirementFormData>({
    resolver: zodResolver(retirementFormSchema),
    defaultValues: storedData,
  });
  
  useEffect(() => {
    form.reset(storedData);
  }, [storedData, form]);

  function calculateRetirementSavings(data: RetirementFormData): RetirementResults {
    const { currentAge, retirementAge, currentSavings, monthlyContribution, expectedReturnRate } = data;
    
    const yearsToRetirement = retirementAge - currentAge;
    const annualRate = expectedReturnRate / 100;
    const monthlyRate = annualRate / 12;
    const numberOfMonths = yearsToRetirement * 12;

    const fvCurrentSavings = currentSavings * Math.pow(1 + annualRate, yearsToRetirement);

    let fvMonthlyContributions = 0;
    if (monthlyRate === 0) {
      fvMonthlyContributions = monthlyContribution * numberOfMonths;
    } else {
      fvMonthlyContributions = monthlyContribution * ( (Math.pow(1 + monthlyRate, numberOfMonths) - 1) / monthlyRate );
    }
    
    const totalSavingsAtRetirement = fvCurrentSavings + fvMonthlyContributions;
    const totalFutureContributions = monthlyContribution * numberOfMonths;
    const totalPrincipalInvested = currentSavings + totalFutureContributions;
    const totalInterestEarned = totalSavingsAtRetirement - totalPrincipalInvested;
    
    return {
      totalSavingsAtRetirement,
      totalContributions: totalPrincipalInvested,
      totalInterestEarned,
    };
  }

  async function onSubmit(data: RetirementFormData) {
    setIsLoading(true);
    setResults(null); 
    setStoredData(data);
    // Simulate calculation if needed, for now it's synchronous
    // await new Promise(resolve => setTimeout(resolve, 500)); 
    const calculatedResults = calculateRetirementSavings(data);
    setResults(calculatedResults);
    setIsLoading(false);
  }

  function handleReset() {
    form.reset(initialRetirementData);
    setStoredData(initialRetirementData);
    setResults(null);
    setIsLoading(false);
  }

  const resultItems: ResultItem[] = results ? [
    { label: "Total Savings at Retirement", value: results.totalSavingsAtRetirement, currency: true, isEmphasized: true },
    { label: "Total Principal Invested", value: results.totalContributions, currency: true },
    { label: "Total Interest Earned", value: results.totalInterestEarned, currency: true },
  ] : [];

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="currentAge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Age</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 30" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="retirementAge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Desired Retirement Age</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 65" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currentSavings"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Savings ($)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 50000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="monthlyContribution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Savings Contribution ($)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 500" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expectedReturnRate"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Expected Annual Return Rate (%)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="e.g., 7" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex space-x-4 pt-4">
            <Button type="submit" className="flex-1" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Plan Retirement
            </Button>
            <Button type="button" variant="outline" onClick={handleReset} className="flex-1" disabled={isLoading}>Reset</Button>
          </div>
        </form>
      </Form>

      {isLoading && (
        <div className="flex justify-center items-center p-6">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2">Planning your retirement...</p>
        </div>
      )}

      {!isLoading && !results && (
         <AdPlaceholder variant="leaderboard" label="Leaderboard Ad (Explore Retirement Options)" className="my-6" />
      )}

      {!isLoading && results && (
        <>
          <AdPlaceholder variant="leaderboard" label="Leaderboard Ad (Before Results)" className="my-6" />
          <ResultsDisplay results={resultItems} />
          <AdPlaceholder variant="inline" label="Ad Targeting Investment Options (After Results)" className="my-6" />
        </>
      )}
    </div>
  );
}
