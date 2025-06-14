
import type { ResultItem, Currency } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import React from "react";

interface ResultsDisplayProps {
  title?: string;
  results: ResultItem[];
  className?: string;
}

export function ResultsDisplay({ title = "Calculation Results", results, className }: ResultsDisplayProps) {
  if (results.length === 0) {
    return null;
  }

  const formatValue = (value: string | number, currencyCode?: Currency) => {
    if (typeof value === 'number') {
      if (currencyCode) {
        return new Intl.NumberFormat(currencyCode === 'USD' ? 'en-US' : 'en-IN', {
          style: 'currency',
          currency: currencyCode,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(value);
      }
      return value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
    }
    return value;
  };

  return (
    <Card className={cn("mt-6 bg-secondary/50 shadow-inner", className)}>
      <CardHeader>
        <CardTitle className="text-xl font-headline text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {results.map((item, index) => (
            <React.Fragment key={index}>
              <li className="flex justify-between items-center text-sm">
                <span className={cn("text-muted-foreground", item.isEmphasized && "font-semibold text-foreground")}>{item.label}:</span>
                <span className={cn("font-semibold", item.isEmphasized ? "text-accent text-lg" : "text-foreground")}>
                  {formatValue(item.value, item.currencyCode)}
                </span>
              </li>
              {index < results.length - 1 && <Separator className="my-2 bg-border/50" />}
            </React.Fragment>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
