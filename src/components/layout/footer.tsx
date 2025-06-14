export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-border/40 bg-background py-6">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>&copy; {currentYear} FinanceForward. All rights reserved.</p>
        <p className="mt-1">Empowering your financial future, one calculation at a time.</p>
      </div>
    </footer>
  );
}
