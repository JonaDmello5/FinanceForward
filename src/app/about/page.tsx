
import { generateAboutUsContent, AboutUsContentInput } from '@/ai/flows/finance-forward-about-us-page';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BotMessageSquare, Users, ShieldCheck } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { AdPlaceholder } from "@/components/ad-placeholder";

async function AboutUsContent() {
  const input: AboutUsContentInput = {
    missionStatementKeywords: "financial planning, ease of use, traditional finance, cryptocurrency, empower users, transparency, comprehensive tools, intuitive, all-encompassing, dynamic potential, innovative resources, cutting-edge calculators, smarter, informed financial decisions", // Keywords updated to reflect new mission
    calculationExplanationsRequest: "Explain the formulas for loan (EMI), investment (compound interest), and retirement (future value of savings and annuity). Mention that calculations are performed client-side for user privacy and speed, using standard financial formulas.",
    geminiApiUsageDetailsRequest: "Describe how Gemini API (or a mock version representing it) is used to fetch real-time crypto data for future value projections in the Cryptocurrency Investment Calculator. Emphasize that this data, combined with an AI model, provides speculative future values and is for illustrative purposes.",
  };

  const userProvidedMissionStatement = "At FinanceForward, our mission is to empower individuals to confidently shape their financial futures by offering intuitive, all-encompassing planning tools. We strive to seamlessly blend traditional financial strategies with the dynamic potential of cryptocurrency, providing transparent, innovative resources and cutting-edge calculators that guide users toward smarter, more informed financial decisions.";

  try {
    // We still call the AI flow to get other content like calculationExplanations and geminiApiUsageDetails
    const content = await generateAboutUsContent(input);

    return (
      <div className="space-y-8">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center gap-3">
            <BotMessageSquare className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl font-headline text-primary">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed text-foreground/90 text-balance">{userProvidedMissionStatement}</p>
          </CardContent>
        </Card>

        <AdPlaceholder variant="leaderboard" label="Ad Between Sections" className="my-8" />

        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl font-headline text-primary">Our Team</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed text-foreground/90 text-balance">
              FinanceForward is developed by a dedicated team passionate about making financial literacy and planning accessible to everyone. We combine expertise in software development and financial technologies to create intuitive and powerful tools. Our goal is to empower you to make informed financial decisions with confidence.
            </p>
          </CardContent>
        </Card>

        <AdPlaceholder variant="inline" label="Ad Between Sections" className="my-8" />

        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl font-headline text-primary">Transparency & How It Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Financial Calculations</h3>
              <p className="text-md leading-relaxed text-foreground/80 text-balance">{content.calculationExplanations}</p>
            </div>
            <hr className="my-4 border-border/50"/>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Cryptocurrency Data & AI</h3>
              <p className="text-md leading-relaxed text-foreground/80 text-balance">{content.geminiApiUsageDetails}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  } catch (error) {
    console.error("Failed to generate About Us content:", error);
    return (
       <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error Generating Content</AlertTitle>
          <AlertDescription>
            We encountered an issue generating some parts of the About Us page content. The mission statement is available, but other details might be missing. Please try refreshing the page. If the problem persists, the AI model might be temporarily unavailable.
          </AlertDescription>
        </Alert>
    );
  }
}

export default async function AboutPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline text-primary">
          About FinanceForward
        </h1>
        <p className="mt-4 text-xl text-foreground/80 max-w-2xl mx-auto text-balance">
          Discover our mission, how our tools work, and our commitment to empowering your financial journey.
        </p>
      </header>
      
      <AboutUsContent />

      <section className="mt-16 py-12 bg-secondary/30 rounded-xl shadow-lg">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline text-primary mb-6">
            Your Financial Partner
          </h2>
          <p className="max-w-xl mx-auto text-lg text-foreground/80 md:text-xl text-balance">
            At FinanceForward, we strive to provide you with accurate, easy-to-use financial calculators and insights. We are continuously working to improve our platform and add new features to help you achieve your financial goals.
          </p>
        </div>
      </section>
    </div>
  );
}

export const revalidate = 3600;
