
import { generateAboutUsContent, AboutUsContentInput } from '@/ai/flows/finance-forward-about-us-page';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BotMessageSquare, Users, ShieldCheck, Lightbulb } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { AdPlaceholder } from "@/components/ad-placeholder";

async function AboutUsContent() {
  const input: AboutUsContentInput = {
    missionStatementKeywords: "financial planning, ease of use, traditional finance, cryptocurrency, empower users, transparency, comprehensive tools, intuitive, all-encompassing, dynamic potential, innovative resources, cutting-edge calculators, smarter, informed financial decisions",
    calculationExplanationsRequest: "Explain the formulas for loan (EMI), investment (compound interest), and retirement (future value of savings and annuity). Mention that calculations are performed client-side for user privacy and speed, using standard financial formulas.", // This input is still sent, but output overridden below
    geminiApiUsageDetailsRequest: "Describe how Gemini API (or a mock version representing it) is used to fetch real-time crypto data for future value projections in the Cryptocurrency Investment Calculator. Emphasize that this data, combined with an AI model, provides speculative future values and is for illustrative purposes.", // This input is still sent, but output overridden below
  };

  const userProvidedMissionStatement = "At FinanceForward, our mission is to empower individuals to confidently shape their financial futures by offering intuitive, all-encompassing planning tools. We strive to seamlessly blend traditional financial strategies with the dynamic potential of cryptocurrency, providing transparent, innovative resources and cutting-edge calculators that guide users toward smarter, more informed financial decisions.";
  const userProvidedTeamInformation = "FinanceForward is built by a passionate team committed to making financial literacy and planning accessible to all. By blending deep expertise in software development with cutting-edge financial technologies, we craft intuitive, powerful tools designed to simplify complex financial decisions. Our mission is to empower you with the knowledge and confidence to take control of your financial journey.";
  const ourStoryContent = "FinanceForward was born from a simple observation: the world of finance is often seen as complex and intimidating. Many people feel left behind, unsure how to plan for their future, manage debt, or understand new opportunities like cryptocurrency. We wanted to change that. We envisioned a single platform where anyone, regardless of their financial background, could access easy-to-use tools to answer their most important financial questions. Our goal is to break down barriers, promote financial literacy, and provide the resources you need to move your finances forward with confidence.";

  const financialCalculationsContent = (
    <>
      <p className="text-md leading-relaxed text-foreground/80 text-balance mb-3">
        Our financial calculations are grounded in well-established, industry-standard formulas for accuracy and reliability. For loan calculations (EMI), we use the formula:
      </p>
      <div className="text-md leading-relaxed text-foreground/80 font-mono bg-secondary/50 p-3 rounded-md my-3 overflow-x-auto shadow-inner">
        M = P [ i(1 + i)<sup>n</sup> ] / [ (1 + i)<sup>n</sup> – 1 ]
      </div>
      <p className="text-md leading-relaxed text-foreground/80 text-balance mb-1">where:</p>
      <ul className="list-disc list-inside text-md leading-relaxed text-foreground/80 space-y-1 mb-4 pl-4">
        <li>M is the monthly payment,</li>
        <li>P is the principal loan amount,</li>
        <li>i is the monthly interest rate, and</li>
        <li>n is the number of months.</li>
      </ul>

      <p className="text-md leading-relaxed text-foreground/80 text-balance mb-3">
        For investment calculations (compound interest), we apply the formula:
      </p>
      <div className="text-md leading-relaxed text-foreground/80 font-mono bg-secondary/50 p-3 rounded-md my-3 overflow-x-auto shadow-inner">
        A = P (1 + r/n)<sup>nt</sup>
      </div>
      <p className="text-md leading-relaxed text-foreground/80 text-balance mb-1">where:</p>
      <ul className="list-disc list-inside text-md leading-relaxed text-foreground/80 space-y-1 mb-4 pl-4">
        <li>A represents the future value of the investment or loan (including interest),</li>
        <li>P is the principal amount (the initial deposit or loan),</li>
        <li>r is the annual interest rate (as a decimal),</li>
        <li>n is the number of times interest is compounded annually, and</li>
        <li>t is the duration of the investment in years.</li>
      </ul>

      <p className="text-md leading-relaxed text-foreground/80 text-balance mb-3">
        In retirement planning, we calculate the future value of savings and annuity payments. The future value of savings is derived from the formula:
      </p>
      <div className="text-md leading-relaxed text-foreground/80 font-mono bg-secondary/50 p-3 rounded-md my-3 overflow-x-auto shadow-inner">
        FV = P * (((1 + r)<sup>n</sup> - 1) / r)
      </div>
      <p className="text-md leading-relaxed text-foreground/80 text-balance mb-1">where:</p>
      <ul className="list-disc list-inside text-md leading-relaxed text-foreground/80 space-y-1 mb-4 pl-4">
        <li>FV is the future value of the savings,</li>
        <li>P is the periodic payment,</li>
        <li>r is the interest rate per period, and</li>
        <li>n is the number of periods.</li>
      </ul>
      <p className="text-md leading-relaxed text-foreground/80 text-balance">
        For annuity calculations, we determine the periodic payments required to reach a desired future value. All calculations are performed client-side to maintain user privacy and ensure fast performance.
      </p>
    </>
  );

  const geminiApiUsageContent = (
    <>
      <p className="text-md leading-relaxed text-foreground/80 text-balance mb-3">
        We leverage the Gemini API (or a mock version representing it) to fetch real-time cryptocurrency data, specifically for our Cryptocurrency Investment Calculator. This up-to-the-minute data is essential for generating future value projections based on various speculative growth scenarios.
      </p>
      <p className="text-md leading-relaxed text-foreground/80 text-balance">
        While our AI model uses this data to simulate potential outcomes, it is crucial to note that these projections are purely illustrative and should not be construed as financial advice. The real-time market conditions provided by the Gemini API serve as the basis for these simulations, ensuring that they reflect the most current state of the cryptocurrency market.
      </p>
    </>
  );
  
  let aiGeneratedContent;
  try {
    // We still call the AI flow, though some of its output is overridden by user-provided text.
    // This is to keep the component structure simple and in case the flow is used for other subtle purposes or future enhancements.
    aiGeneratedContent = await generateAboutUsContent(input);
  } catch (error) {
    console.error("Failed to generate About Us content via AI:", error);
    // Fallback content or error display will be handled in the return statement
  }

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
          <Lightbulb className="h-8 w-8 text-primary" />
          <CardTitle className="text-2xl font-headline text-primary">Our Story</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg leading-relaxed text-foreground/90 text-balance">
            {ourStoryContent}
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center gap-3">
          <Users className="h-8 w-8 text-primary" />
          <CardTitle className="text-2xl font-headline text-primary">Our Team</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg leading-relaxed text-foreground/90 text-balance">
            {userProvidedTeamInformation}
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
            {financialCalculationsContent}
          </div>
          <hr className="my-4 border-border/50"/>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Cryptocurrency Data & AI</h3>
            {geminiApiUsageContent}
          </div>
           {!aiGeneratedContent && (
            <Alert variant="destructive" className="mt-6">
              <Terminal className="h-4 w-4" />
              <AlertTitle>AI Content Note</AlertTitle>
              <AlertDescription>
                Some supplementary content details are usually AI-enhanced. If parts of this page seem brief, the AI model might be temporarily unavailable. The core information is always displayed.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
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
      
    </div>
  );
}

export const revalidate = 3600;

    