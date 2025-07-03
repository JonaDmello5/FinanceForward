
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Landmark, Briefcase, Users, Bitcoin, ArrowRight } from 'lucide-react';

const tools = [
  {
    title: "Loan Calculator",
    description: "Estimate your loan installments, total interest, and see a detailed amortization schedule.",
    href: "/loan-calculator",
    icon: <Landmark className="h-10 w-10 text-primary mb-4" />,
    cta: "Calculate Loan"
  },
  {
    title: "Investment Calculator",
    description: "Project the future value of your investments with compound interest calculations.",
    href: "/investment-calculator",
    icon: <Briefcase className="h-10 w-10 text-primary mb-4" />,
    cta: "Project Investment"
  },
  {
    title: "Retirement Planning",
    description: "Plan for your golden years by estimating your retirement savings and contributions needed.",
    href: "/retirement-planner",
    icon: <Users className="h-10 w-10 text-primary mb-4" />,
    cta: "Plan Retirement"
  },
  {
    title: "Crypto Investment Tracker",
    description: "Estimate the potential future value of your cryptocurrency investments using AI-powered projections.",
    href: "/crypto-tracker",
    icon: <Bitcoin className="h-10 w-10 text-primary mb-4" />,
    cta: "Track Crypto"
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <section className="w-full py-12 md:py-20 lg:py-28 text-center bg-gradient-to-br from-primary/10 via-background to-background rounded-xl shadow-lg">
        <div className="container px-4 md:px-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline text-primary mb-6 text-balance">
            Welcome to FinanceForward
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-foreground/80 md:text-xl lg:text-2xl mb-8 text-balance">
            Empower your financial journey with our suite of powerful, intuitive calculators. Whether you're planning for a major purchase, tracking investments, preparing for retirement, or exploring the potential of cryptocurrency, FinanceForward provides the clear, data-driven insights you need to make confident decisions.
          </p>
          <Link href="#tools" passHref>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-md transition-transform hover:scale-105">
              Explore Our Tools
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <section id="tools" className="w-full py-12 md:py-20 lg:py-24">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl md:text-5xl font-headline text-primary mb-12">
            Financial Tools at Your Fingertips
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
            {tools.map((tool) => (
              <Card key={tool.title} className="flex flex-col shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
                <CardHeader className="items-center text-center">
                  {tool.icon}
                  <CardTitle className="text-2xl font-headline">{tool.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-center text-foreground/70 text-balance">
                    {tool.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="justify-center">
                  <Link href={tool.href} passHref>
                    <Button variant="default" className="w-full sm:w-auto">
                      {tool.cta} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

       <section className="w-full py-12 md:py-20 lg:py-24 bg-secondary/30 rounded-xl shadow-lg">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-headline text-primary mb-6">
            Ready to Take Control?
          </h2>
          <p className="max-w-xl mx-auto text-lg text-foreground/80 md:text-xl mb-8 text-balance">
            Start planning your financial future today. It’s simple, intuitive, and powerful.
          </p>
          <Link href="/about" passHref>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 shadow-md transition-transform hover:scale-105">
              Learn More About Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

    