
export type Currency = 'USD' | 'INR';

export interface LoanFormData {
  loanAmount: number;
  interestRate: number;
  loanTenure: number; // in years
  repaymentFrequency: 'monthly' | 'bi-weekly' | 'weekly';
  currency: Currency;
}

export interface AmortizationRecord {
  period: number;
  principal: number;
  interest: number;
  endingBalance: number;
}

export interface LoanResults {
  monthlyInstallment: number;
  totalRepayment: number;
  totalInterest: number;
  amortizationTable: AmortizationRecord[];
  currency: Currency;
}

export interface InvestmentFormData {
  principalAmount: number;
  annualInterestRate: number;
  investmentPeriod: number; // in years
  compoundingFrequency: 'annually' | 'semi-annually' | 'quarterly' | 'monthly';
  currency: Currency;
}

export interface InvestmentResults {
  futureValue: number;
  totalInterest: number;
  totalContributions: number;
  currency: Currency;
}

export interface RetirementFormData {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlyContribution: number;
  expectedReturnRate: number; // annual
  currency: Currency;
}

export interface RetirementResults {
  totalSavingsAtRetirement: number;
  totalContributions: number;
  totalInterestEarned: number;
  currency: Currency;
}

export interface CryptoInvestmentFormData {
  cryptoAmount: number;
  cryptoTicker: 'BTC' | 'ETH' | 'SOL' | 'ADA' | 'DOGE' | 'DOT' | 'LINK' | 'LTC' | 'BCH' | 'XLM' | 'FIL' | 'TRX' | 'XMR' | 'EOS';
  investmentPeriod: number; // in years
}

export interface CryptoInvestmentResults {
  futureValue: number;
  currentPriceUSD?: number; // Price per unit of crypto in USD
  initialInvestmentUSD?: number;
  cryptoTicker: string;
}

// General type for displaying results in a list
export interface ResultItem {
  label: string;
  value: string | number;
  isEmphasized?: boolean;
  currencyCode?: Currency;
}
