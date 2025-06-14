import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import React from "react";

interface CalculatorCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

export function CalculatorCard({ title, description, icon: Icon, children, className }: CalculatorCardProps) {
  return (
    <Card className={`w-full shadow-xl hover:shadow-2xl transition-shadow duration-300 ${className}`}>
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          {Icon && <Icon className="h-8 w-8 text-primary" />}
          <CardTitle className="text-2xl font-headline text-primary">{title}</CardTitle>
        </div>
        {description && <CardDescription className="text-sm">{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}
