
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { LOCAL_STORAGE_KEYS } from "@/lib/constants";
import type { InvestmentFormData, InvestmentResults, ResultItem, Currency } from "@/lib/types";
import { ResultsDisplay } from "./results-display";
import { useEffect, useState } from "react";
import { AdPlaceholder } from "./ad-placeholder";

const investmentFormSchema = z.object({
  principalAmount: z.coerce.number().min(1, "Principal amount must be positive."),
  annualInterestRate: z.coerce.number().min(0, "Interest rate cannot be negative.").max(100, "Interest rate seems too high."),
  investmentPeriod: z.coerce.number().min(1, "Investment period must be at least 1 year."),
  compoundingFrequency: z.enum(['annually', 'semi-annually', 'quarterly', 'monthly']),
  currency: z.enum(['USD', 'INR']),
});

const initialInvestmentData: InvestmentFormData = {
  principalAmount: 1000,
  annualInterestRate: 7,
  investmentPeriod: 10,
  compoundingFrequency: 'annually',
  currency: 'USD',
};

export function InvestmentCalculatorForm() {
  const [storedData, setStoredData] = useLocalStorage<InvestmentFormData>(LOCAL_STORAGE_KEYS.INVESTMENT_CALCULATOR, initialInvestmentData);
  const [results, setResults] = useState<InvestmentResults | null>(null);

  const form = useForm<InvestmentFormData>({
    resolver: zodResolver(investmentFormSchema),
    defaultValues: storedData,
  });

  useEffect(() => {
    form.reset(storedData);
  }, [storedData, form]);

  const selectedCurrency = form.watch('currency');

  function calculateInvestmentGrowth(data: InvestmentFormData): InvestmentResults {
    const principal = data.principalAmount;
    const annualRate = data.annualInterestRate / 100;
    const years = data.investmentPeriod;
    
    let n: number; 
    switch (data.compoundingFrequency) {
      case 'annually': n = 1; break;
      case 'semi-annually': n = 2; break;
      case 'quarterly': n = 4; break;
      case 'monthly': n = 12; break;
      default: n = 1;
    }

    const futureValue = principal * Math.pow((1 + annualRate / n), n * years);
    const totalInterest = futureValue - principal;

    return {
      futureValue,
      totalInterest,
      totalContributions: principal, 
      currency: data.currency,
    };
  }

  function onSubmit(data: InvestmentFormData) {
    setStoredData(data);
    const calculatedResults = calculateInvestmentGrowth(data);
    setResults(calculatedResults);
  }

  function handleReset() {
    form.reset(initialInvestmentData);
    setStoredData(initialInvestmentData);
    setResults(null);
  }

  const resultItems: ResultItem[] = results ? [
    { label: "Future Value", value: results.futureValue, currencyCode: results.currency, isEmphasized: true },
    { label: "Principal Amount", value: results.totalContributions, currencyCode: results.currency },
    { label: "Total Interest Earned", value: results.totalInterest, currencyCode: results.currency },
  ] : [];

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="INR">INR (₹)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="principalAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Principal Amount</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 1000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="annualInterestRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Annual Interest Rate (%)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="e.g., 7" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="investmentPeriod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Investment Period (Years)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="compoundingFrequency"
              render={({ field }) => (
                <FormItem className="md:col-span-2"> {/* Adjusted for better layout with currency field */}
                  <FormLabel>Compounding Frequency</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="annually">Annually</SelectItem>
                      <SelectItem value="semi-annually">Semi-Annually</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex space-x-4 pt-4">
            <Button type="submit" className="flex-1">Calculate Investment</Button>
            <Button type="button" variant="outline" onClick={handleReset} className="flex-1">Reset</Button>
          </div>
        </form>
      </Form>

      {results && (
        <>
          <ResultsDisplay results={resultItems} title={`Investment Growth (${selectedCurrency})`} />
          <AdPlaceholder variant="inline" label="Ad After Results Display" className="my-6" />
        </>
      )}
    </div>
  );
}
