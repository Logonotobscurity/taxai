// A configurable rules engine for tax regulations.

/**
 * MOCK DATA representing the kind of data we'd get from a FIRS API.
 */
const mockRulesData = {
  taxYear: '2025',
  version: '1.0.2',
  effectiveDate: '2025-01-01',
  categories: [
    {
      name: 'PAYE',
      rules: [
        {
          name: 'ConsolidatedRelief',
          description: 'Calculates the Consolidated Relief Allowance (CRA).',
          type: 'calculation',
          expression: 'Math.max(200000, 0.01 * grossIncome) + 0.20 * grossIncome',
          parameters: [{ name: 'grossIncome' }],
          source: 'PITA 2011 (as amended)',
          effectiveDate: '2020-01-01',
        },
        {
          name: 'TaxableIncome',
          description: 'Determines the final taxable income after all deductions.',
          type: 'calculation',
          expression: 'grossIncome - consolidatedRelief - pension - nhf - nhis - lifeInsurance',
          parameters: [
            { name: 'grossIncome' },
            { name: 'consolidatedRelief' },
            { name: 'pension' },
            { name: 'nhf' },
            { name: 'nhis' },
            { name: 'lifeInsurance' },
          ],
          source: 'PITA 2011 (as amended)',
          effectiveDate: '2020-01-01',
        },
      ],
    },
    {
      name: 'VAT',
      rules: [
        {
          name: 'StandardRate',
          description: 'Calculates VAT at the standard rate.',
          type: 'calculation',
          expression: 'amount * 0.075',
          parameters: [{ name: 'amount' }],
          source: 'Finance Act 2020',
          effectiveDate: '2020-02-01',
        },
      ],
    },
  ],
};

export class TaxRulesEngine {
  private rules = new Map<string, any>();
  private versions = new Map<string, any>();

  constructor() {
    // In a real app, loadRules might be called on initialization
  }

  // Load rules from a mock API or database
  async loadRules(taxYear = '2025') {
    try {
      // In a real app, this would be a fetch call to an API.
      // const response = await fetch(`https://api.firs.gov.ng/tax-rules/${taxYear}`);
      // const rulesData = await response.json();
      const rulesData = mockRulesData; // Using mock data for the prototype

      this.parseRules(rulesData);

      this.versions.set(taxYear, {
        effectiveDate: new Date(rulesData.effectiveDate),
        version: rulesData.version,
        lastUpdated: new Date(),
      });
      console.log(`Tax rules for ${taxYear} loaded successfully.`);
      return true;
    } catch (error) {
      console.error('Failed to load rules, using cached or fallback:', error);
      // Implement fallback logic if needed
      return false;
    }
  }

  private parseRules(rulesData: any) {
    this.rules.clear();

    rulesData.categories.forEach((category: any) => {
      category.rules.forEach((rule: any) => {
        const ruleKey = `${category.name}.${rule.name}`;
        const ruleFunction = this.compileRule(rule);

        this.rules.set(ruleKey, {
          name: ruleKey,
          function: ruleFunction,
          description: rule.description,
          effectiveDate: new Date(rule.effectiveDate),
          expirationDate: rule.expirationDate
            ? new Date(rule.expirationDate)
            : null,
          category: category.name,
          source: rule.source,
        });
      });
    });
  }

  private compileRule(rule: any): Function {
    const parameters = rule.parameters.map((p: any) => p.name).join(', ');

    try {
        switch (rule.type) {
            case 'calculation':
              return new Function(parameters, `return ${rule.expression};`);
            case 'condition':
              return new Function(
                parameters,
                `if (${rule.condition}) { return ${rule.thenExpression}; } else { return ${rule.elseExpression}; }`
              );
            case 'threshold':
              return new Function(
                'value',
                'threshold',
                `return value ${rule.operator} threshold ? ${rule.ifTrue} : ${rule.ifFalse};`
              );
            default:
              throw new Error(`Unknown rule type: ${rule.type}`);
          }
    } catch (e: any) {
        console.error(`Error compiling rule "${rule.name}": ${e.message}`);
        // Return a function that throws to prevent execution of faulty rules
        return () => { throw new Error(`Cannot execute faulty rule "${rule.name}"`); };
    }
  }
  
  private getParameterNames(func: Function): string[] {
    const fnStr = func.toString().replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, '');
    let result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(/([^\s,]+)/g);
    if (result === null)
       return [];
    return result;
  }

  private extractParameters(ruleName: string, context: { [key: string]: any }): any[] {
    const rule = this.rules.get(ruleName);
    if (!rule) throw new Error(`Rule not found: ${ruleName}`);

    const parameterNames = this.getParameterNames(rule.function);
    
    return parameterNames.map(name => {
      if (context.hasOwnProperty(name)) {
        return context[name];
      }
      throw new Error(`Missing parameter "${name}" for rule "${ruleName}"`);
    });
  }

  evaluateRule(ruleName: string, context: { [key: string]: any }) {
    const rule = this.rules.get(ruleName);
    if (!rule) {
      throw new Error(`Rule not found: ${ruleName}`);
    }

    const currentDate = new Date();
    if (currentDate < rule.effectiveDate) {
      throw new Error(`Rule "${ruleName}" is not yet effective.`);
    }
    if (rule.expirationDate && currentDate > rule.expirationDate) {
      throw new Error(`Rule "${ruleName}" has expired.`);
    }
    
    const parameters = this.extractParameters(ruleName, context);

    try {
        return rule.function.apply(null, parameters);
    } catch (error: any) {
        throw new Error(`Failed to execute rule ${ruleName}: ${error.message}`);
    }
  }

  getRulesForCalculation(calculationType: string) {
    const matchingRules: any[] = [];
    this.rules.forEach((rule) => {
      if (rule.category === calculationType) {
        matchingRules.push(rule);
      }
    });
    return matchingRules;
  }

  validateCalculation(calculationType: string, inputs: any, result: number) {
    const rules = this.getRulesForCalculation(calculationType);
    const violations: any[] = [];

    rules.forEach(rule => {
      try {
        const expected = this.evaluateRule(rule.name, inputs);
        
        // Simple comparison, allowing for floating point inaccuracies
        if (typeof expected === 'number' && typeof result === 'number') {
            if (Math.abs(expected - result) > 0.01) {
                violations.push({
                    rule: rule.name,
                    expected,
                    actual: result,
                    description: rule.description
                });
            }
        } else if (expected !== result) {
            violations.push({
                rule: rule.name,
                expected,
                actual: result,
                description: rule.description
            });
        }

      } catch (error: any) {
        // This might indicate a missing parameter in the input, not necessarily a violation
        console.warn(`Could not evaluate rule ${rule.name} for validation: ${error.message}`);
      }
    });

    return violations;
  }
}
