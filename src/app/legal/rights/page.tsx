
import { Copyright } from 'lucide-react';

export default function RightsPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <header className="text-center mb-12">
        <Copyright className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline text-primary">
          Rights & Ownership
        </h1>
      </header>

      <div className="max-w-3xl mx-auto space-y-6 bg-card p-6 sm:p-8 rounded-xl shadow-lg">
        <p className="text-lg text-foreground/90 leading-relaxed text-balance">
          © {currentYear} FinanceForward. All rights reserved.
        </p>
        <p className="text-md text-foreground/80 leading-relaxed text-balance">
          FinanceForward, including its codebase, design assets, and content, is the intellectual property of its creators. Unauthorized reproduction, distribution, or modification of any part of the platform is strictly prohibited without prior written consent.
        </p>
        <p className="text-md text-foreground/80 leading-relaxed text-balance">
          Open-source libraries and dependencies are governed by their respective licenses as noted in the package manifest.
        </p>
      </div>
    </div>
  );
}

