
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
         <p className="mt-4 text-xl text-foreground/80 max-w-3xl mx-auto text-balance">
          Understanding the terms of use for FinanceForward's content and tools.
        </p>
      </header>

      <div className="max-w-3xl mx-auto space-y-8 bg-card p-6 sm:p-8 rounded-xl shadow-lg text-foreground/80">
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">1. Copyright and Intellectual Property</h2>
          <p className="leading-relaxed text-balance">
            © {currentYear} FinanceForward. All Rights Reserved.
          </p>
          <p className="mt-2 leading-relaxed text-balance">
            All content on this website, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software, is the property of FinanceForward or its content suppliers and is protected by international copyright laws. The compilation of all content on this site is the exclusive property of FinanceForward.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">2. Trademarks</h2>
           <p className="leading-relaxed text-balance">
            The name "FinanceForward" and its associated logos are trademarks of FinanceForward. These trademarks may not be used in connection with any product or service that is not ours, in any manner that is likely to cause confusion among users, or in any manner that disparages or discredits FinanceForward.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">3. License and Site Access</h2>
          <p className="leading-relaxed text-balance">
            FinanceForward grants you a limited license to access and make personal use of this site. This license does not include any resale or commercial use of this site or its contents; any collection and use of any product listings, descriptions, or prices; any derivative use of this site or its contents; any downloading or copying of account information for the benefit of another merchant; or any use of data mining, robots, or similar data gathering and extraction tools.
          </p>
           <p className="mt-2 leading-relaxed text-balance">
            This site or any portion of this site may not be reproduced, duplicated, copied, sold, resold, visited, or otherwise exploited for any commercial purpose without express written consent from FinanceForward.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">4. Third-Party and Open-Source Software</h2>
          <p className="leading-relaxed text-balance">
            This application is built using various open-source libraries and dependencies. These components are governed by their own respective licenses, which can be reviewed in our project's package manifest. We are grateful to the open-source community for their contributions.
          </p>
        </section>
      </div>
    </div>
  );
}
