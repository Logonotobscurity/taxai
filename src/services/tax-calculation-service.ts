import { TaxRulesEngine } from './tax-rules-engine';

/**
 * A service to perform tax calculations using a dynamic rules engine.
 * This separates the calculation logic from the AI analysis.
 */
export class TaxCalculationService {
  private rulesEngine: TaxRulesEngine;

  constructor(rulesEngine: TaxRulesEngine) {
    this.rulesEngine = rulesEngine;
  }

  calculatePAYE(context: {
    income: number;
    deductions?: {
      pension?: number;
      nhf?: number;
      nhis?: number;
      lifeInsurance?: number;
    };
  }) {
    const grossIncome = context.income;
    const pension = context.deductions?.pension || 0;
    const nhf = context.deductions?.nhf || 0;
    const nhis = context.deductions?.nhis || 0;
    const lifeInsurance = context.deductions?.lifeInsurance || 0;

    // Step 1: Calculate Consolidated Relief Allowance (CRA)
    const consolidatedRelief = this.rulesEngine.evaluateRule(
      'PAYE.ConsolidatedRelief',
      { grossIncome }
    );

    // Step 2: Calculate Taxable Income
    const taxableIncome = this.rulesEngine.evaluateRule('PAYE.TaxableIncome', {
      grossIncome,
      consolidatedRelief,
      pension,
      nhf,
      nhis,
      lifeInsurance,
    });

    // Step 3: Calculate Tax based on brackets
    const { totalTax, taxBrackets } = this.calculateTaxWithBrackets(taxableIncome);

    const takeHome = grossIncome - totalTax - pension - nhf - nhis - lifeInsurance;
    const effectiveRate = (totalTax / grossIncome) * 100;

    return {
      totalTax,
      taxableIncome,
      takeHome,
      monthlyTax: totalTax / 12,
      monthlyIncome: grossIncome / 12,
      effectiveRate,
      pensionDeduction: pension,
      nhfDeduction: nhf,
      annualRelief: consolidatedRelief,
      taxBrackets,
    };
  }
  
  // This is a simplified bracket calculation based on standard Nigerian PAYE.
  // In a real system, this might also be a configurable rule.
  private calculateTaxWithBrackets(taxableIncome: number) {
    let remainingIncome = taxableIncome;
    let totalTax = 0;
    const taxBrackets: { range: string; rate: number; tax: number }[] = [];

    const brackets = [
      { limit: 300000, rate: 0.07 },
      { limit: 300000, rate: 0.11 },
      { limit: 500000, rate: 0.15 },
      { limit: 500000, rate: 0.19 },
      { limit: 1600000, rate: 0.21 },
      { limit: Infinity, rate: 0.24 },
    ];
    
    let previousLimit = 0;

    for (const bracket of brackets) {
      if (remainingIncome <= 0) break;
      
      const taxableInBracket = Math.min(remainingIncome, bracket.limit);
      const taxInBracket = taxableInBracket * bracket.rate;
      totalTax += taxInBracket;
      remainingIncome -= taxableInBracket;

      const rangeEnd = previousLimit + bracket.limit;
      taxBrackets.push({
        range: `₦${previousLimit.toLocaleString()} - ₦${rangeEnd.toLocaleString()}`,
        rate: bracket.rate * 100,
        tax: taxInBracket,
      });
      previousLimit = rangeEnd;
    }

    return { totalTax, taxBrackets };
  }
}
