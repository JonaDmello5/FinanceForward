
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Landmark, Briefcase, Users, Bitcoin, ArrowRight } from 'lucide-react';

const tools = [
  {
    title: "Loan Calculator Guide",
    description: "See exactly how much you’ll pay on any loan. Our tool helps you instantly see monthly payments, total costs, and even how early repayments can save you money.",
    href: "/loan-calculator",
    icon: <Landmark className="h-10 w-10 text-primary mb-4" />,
    cta: "Calculate Loan"
  },
  {
    title: "Investment Growth Forecaster",
    description: "Discover how your money can grow. Project the future value of your investments with compound interest and see the power of long-term wealth building.",
    href: "/investment-calculator",
    icon: <Briefcase className="h-10 w-10 text-primary mb-4" />,
    cta: "Project Investment"
  },
  {
    title: "Retirement Savings Planner",
    description: "Are you saving enough for retirement? Plan for your golden years by estimating the total savings you'll need and see how your contributions add up over time.",
    href: "/retirement-planner",
    icon: <Users className="h-10 w-10 text-primary mb-4" />,
    cta: "Plan Retirement"
  },
  {
    title: "AI Crypto Projections",
    description: "Explore the potential future of your crypto assets. Get AI-powered projections based on market data to understand possible growth scenarios for your investments.",
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
            Take Control of Your Financial Future
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-foreground/80 md:text-xl lg:text-2xl mb-8 text-balance">
            Feeling overwhelmed by loans, investments, or retirement planning? FinanceForward cuts through the complexity. We provide clear, simple, and powerful calculators to help you understand your numbers, plan with confidence, and build a secure financial future. No jargon, just answers.
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
