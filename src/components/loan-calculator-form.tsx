
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { LOCAL_STORAGE_KEYS } from "@/lib/constants";
import type { LoanFormData, LoanResults, AmortizationRecord, ResultItem, Currency } from "@/lib/types";
import { ResultsDisplay } from "./results-display";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { AdPlaceholder } from "./ad-placeholder";

const loanFormSchema = z.object({
  loanAmount: z.coerce.number().min(1, "Loan amount must be positive."),
  interestRate: z.coerce.number().min(0, "Interest rate cannot be negative.").max(100, "Interest rate seems too high."),
  loanTenure: z.coerce.number().min(1, "Loan tenure must be at least 1 year."),
  repaymentFrequency: z.enum(['monthly', 'bi-weekly', 'weekly']),
  currency: z.enum(['USD', 'INR']),
});

const initialLoanData: LoanFormData = {
  loanAmount: 10000,
  interestRate: 5,
  loanTenure: 5,
  repaymentFrequency: 'monthly',
  currency: 'USD',
};

export function LoanCalculatorForm() {
  const [storedData, setStoredData] = useLocalStorage<LoanFormData>(LOCAL_STORAGE_KEYS.LOAN_CALCULATOR, initialLoanData);
  const [results, setResults] = useState<LoanResults | null>(null);

  const form = useForm<LoanFormData>({
    resolver: zodResolver(loanFormSchema),
    defaultValues: storedData,
  });

 useEffect(() => {
    form.reset(storedData);
     // If currency changed via storedData, and form was reset, clear results
    if (results && storedData.currency !== results.currency) {
      setResults(null);
    }
  }, [storedData, form, results]);

  const selectedCurrency = form.watch('currency');

  function calculateLoanDetails(data: LoanFormData): LoanResults {
    const principal = data.loanAmount;
    const annualRate = data.interestRate / 100;
    
    let periodsPerYear: number;
    switch (data.repaymentFrequency) {
      case 'monthly': periodsPerYear = 12; break;
      case 'bi-weekly': periodsPerYear = 26; break;
      case 'weekly': periodsPerYear = 52; break;
      default: periodsPerYear = 12;
    }

    const numberOfPayments = data.loanTenure * periodsPerYear;
    const periodicRate = annualRate / periodsPerYear;

    let installment: number;
    if (periodicRate === 0) {
      installment = principal / numberOfPayments;
    } else {
      installment = principal * periodicRate * Math.pow(1 + periodicRate, numberOfPayments) / (Math.pow(1 + periodicRate, numberOfPayments) - 1);
    }
    
    const totalRepayment = installment * numberOfPayments;
    const totalInterest = totalRepayment - principal;

    const amortizationTable: AmortizationRecord[] = [];
    let balance = principal;
    for (let i = 1; i <= numberOfPayments; i++) {
      const interestPayment = balance * periodicRate;
      const principalPayment = installment - interestPayment;
      balance -= principalPayment;
      if (balance < 0.005 && balance > -0.005) balance = 0; 
      amortizationTable.push({
        period: i,
        principal: principalPayment,
        interest: interestPayment,
        endingBalance: balance,
      });
       if (balance === 0 && i < numberOfPayments) break; 
    }
    
    if (amortizationTable.length > 0 && amortizationTable[amortizationTable.length-1].endingBalance !== 0 && amortizationTable[amortizationTable.length-1].endingBalance < installment ) { 
        const lastRecord = amortizationTable[amortizationTable.length - 1];
        if (Math.abs(lastRecord.endingBalance) > 0.005) { 
             lastRecord.principal += lastRecord.endingBalance; 
        }
        lastRecord.endingBalance = 0;
    }

    return {
      monthlyInstallment: installment, 
      totalRepayment,
      totalInterest,
      amortizationTable,
      currency: data.currency,
    };
  }

  function onSubmit(data: LoanFormData) {
    setStoredData(data); // Save current form data (including potentially new currency)
    const calculatedResults = calculateLoanDetails(data);
    setResults(calculatedResults);
  }

  function handleReset() {
    setStoredData(initialLoanData); // Reset to initial defaults, including currency
    form.reset(initialLoanData);
    setResults(null);
  }

  const resultItems: ResultItem[] = results ? [
    { 
      label: `${results.amortizationTable.length > 0 && form.getValues("repaymentFrequency") === 'monthly' ? 'Monthly' : 
                results.amortizationTable.length > 0 && form.getValues("repaymentFrequency") === 'bi-weekly' ? 'Bi-Weekly' :
                results.amortizationTable.length > 0 && form.getValues("repaymentFrequency") === 'weekly' ? 'Weekly' : 'Periodic'} Installment`, 
      value: results.monthlyInstallment, 
      currencyCode: results.currency, 
      isEmphasized: true 
    },
    { label: "Total Repayment", value: results.totalRepayment, currencyCode: results.currency },
    { label: "Total Interest Paid", value: results.totalInterest, currencyCode: results.currency },
    { label: "Number of Payments", value: results.amortizationTable.length },
  ] : [];

  const formatCurrencyValue = (value: number, currency: Currency) => {
    return new Intl.NumberFormat(currency === 'USD' ? 'en-US' : 'en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

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
                  <Select
                    onValueChange={(newCurrency: Currency) => {
                      const currentFormValues = form.getValues();
                      field.onChange(newCurrency); // Update currency in form state
                      setStoredData({
                        ...currentFormValues, // Keep other fields like rate, tenure
                        currency: newCurrency,
                        loanAmount: initialLoanData.loanAmount, // Reset loanAmount to its initial default
                      });
                      setResults(null); // Clear previous results
                    }}
                    value={field.value} // Ensure Select reflects form state
                  >
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
              name="loanAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loan Amount</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 10000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interestRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Annual Interest Rate (%)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="e.g., 5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="loanTenure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loan Tenure (Years)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="repaymentFrequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repayment Frequency</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="bi-weekly">Bi-Weekly</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex space-x-4 pt-4">
            <Button type="submit" className="flex-1">Calculate Loan</Button>
            <Button type="button" variant="outline" onClick={handleReset} className="flex-1">Reset</Button>
          </div>
        </form>
      </Form>

      {results && (
        <>
          <ResultsDisplay results={resultItems} title={`Loan Calculation Results (${selectedCurrency})`} />
          <AdPlaceholder variant="leaderboard" label="Ad Between Results and Next Section" className="my-6" />
          {results.amortizationTable.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-primary font-headline">Amortization Schedule</h3>
              <ScrollArea className="h-[400px] w-full rounded-md border shadow-inner">
                <Table>
                  <TableCaption>Detailed breakdown of each payment over the loan term.</TableCaption>
                  <TableHeader className="sticky top-0 bg-secondary z-10">
                    <TableRow>
                      <TableHead className="w-[100px]">Period</TableHead>
                      <TableHead>Principal</TableHead>
                      <TableHead>Interest</TableHead>
                      <TableHead className="text-right">Ending Balance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.amortizationTable.map((record) => (
                      <TableRow key={record.period}>
                        <TableCell className="font-medium">{record.period}</TableCell>
                        <TableCell>{formatCurrencyValue(record.principal, results.currency)}</TableCell>
                        <TableCell>{formatCurrencyValue(record.interest, results.currency)}</TableCell>
                        <TableCell className="text-right">{formatCurrencyValue(record.endingBalance, results.currency)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          )}
        </>
      )}
    </div>
  );
}
