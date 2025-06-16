
import { ShieldAlert } from 'lucide-react';

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <header className="text-center mb-12">
        <ShieldAlert className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline text-primary">
          Disclaimer
        </h1>
      </header>

      <div className="max-w-3xl mx-auto space-y-6 bg-card p-6 sm:p-8 rounded-xl shadow-lg">
        <p className="text-lg text-foreground/90 leading-relaxed text-balance">
          FinanceForward is intended for informational and educational purposes only.
        </p>
        <p className="text-md text-foreground/80 leading-relaxed text-balance">
          The platform does not provide financial, investment, or legal advice. All projections, estimates, and analytics related to cryptocurrency, loans, and investments are based on publicly available data or user input and do not guarantee actual outcomes.
        </p>
        <p className="text-md text-foreground/80 leading-relaxed text-balance">
          Users are advised to consult qualified financial professionals before making decisions based on content presented on this platform. FinanceForward and its creators are not liable for any loss or damage arising from the use of this application.
        </p>
        <p className="text-md text-foreground/80 leading-relaxed text-balance">
          By using this application, you acknowledge and accept these terms.
        </p>
      </div>
    </div>
  );
}
