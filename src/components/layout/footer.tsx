
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-border/40 bg-background py-8">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <div className="mb-4 flex justify-center space-x-4 md:space-x-6">
          <Link href="/legal/disclaimer" className="hover:text-primary transition-colors">
            Disclaimer
          </Link>
          <Link href="/legal/rights" className="hover:text-primary transition-colors">
            Rights
          </Link>
          <Link href="/about" className="hover:text-primary transition-colors">
            About Us
          </Link>
          <Link href="/contact" className="hover:text-primary transition-colors">
            Contact Us
          </Link>
        </div>
        <p>&copy; {currentYear} FinanceForward. All rights reserved.</p>
        <p className="mt-1">Empowering your financial future, one calculation at a time.</p>
      </div>
    </footer>
  );
}
