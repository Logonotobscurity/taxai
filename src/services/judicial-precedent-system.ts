// A system for managing and interpreting judicial precedents related to tax law.

/**
 * MOCK DATA representing judicial precedents from a FIRS jurisprudence database.
 */
const mockPrecedentsData = [
  {
    caseName: 'Shell v. FIRS',
    citation: 'SCN/22/2018',
    court: 'Supreme Court',
    decisionDate: '2020-05-15',
    summary:
      'The Supreme Court ruled that education is a deductible expense for calculating personal income tax, clarifying the interpretation of "wholly, reasonably, exclusively and necessarily" incurred expenses.',
    fullText: 'Full text of the judgment would be here...',
    taxRules: ['PAYE.ConsolidatedRelief', 'PAYE.TaxableIncome'],
    interpretations: {
      'PAYE.TaxableIncome':
        'Expenses for personal education and professional development are considered valid deductions.',
    },
    citationCount: 15,
  },
  {
    caseName: 'MTN v. AG Lagos',
    citation: 'CA/L/443/2019',
    court: 'Court of Appeal',
    decisionDate: '2021-02-10',
    summary:
      'The Court of Appeal held that Value Added Tax (VAT) on digital services is applicable at the point of consumption, setting a precedent for e-commerce taxation.',
    fullText: 'Full text of the judgment would be here...',
    taxRules: ['VAT.StandardRate'],
    interpretations: {
      'VAT.StandardRate':
        'VAT applies to digital goods and services consumed within Nigeria, regardless of the provider`s location.',
    },
    citationCount: 8,
  },
];

export class JudicialPrecedentSystem {
  private precedents = new Map<string, any>();
  private citationIndex = new Map<string, string[]>();

  constructor() {
    // In a real app, this might be async and loaded on demand.
    this.loadPrecedents();
  }

  private loadPrecedents() {
    try {
      // In a real app, this would fetch from a database or API.
      // For this prototype, we use mock data.
      mockPrecedentsData.forEach((precedent) => {
        this.addPrecedent(precedent);
      });
      console.log('Judicial precedents loaded successfully.');
    } catch (error) {
      console.error('Failed to load judicial precedents:', error);
    }
  }

  private addPrecedent(precedent: any) {
    const precedentId = precedent.citation; // Use citation as a unique ID
    this.precedents.set(precedentId, {
      id: precedentId,
      ...precedent,
      decisionDate: new Date(precedent.decisionDate),
      weight: this.calculatePrecedentWeight(precedent),
    });

    // Index by tax rules
    precedent.taxRules.forEach((rule: string) => {
      if (!this.citationIndex.has(rule)) {
        this.citationIndex.set(rule, []);
      }
      this.citationIndex.get(rule)!.push(precedentId);
    });
  }

  private calculatePrecedentWeight(precedent: any): number {
    let weight = 0;
    const courtWeights: { [key: string]: number } = {
      'Supreme Court': 10,
      'Court of Appeal': 7,
      'Federal High Court': 5,
      'Tax Appeal Tribunal': 3,
    };
    weight += courtWeights[precedent.court] || 1;
    const decisionDate = new Date(precedent.decisionDate);
    const yearsOld = new Date().getFullYear() - decisionDate.getFullYear();
    weight += Math.max(0, 10 - yearsOld) / 10;
    weight += Math.log1p(precedent.citationCount || 0);
    return weight;
  }

  public getPrecedentsForRule(ruleName: string, limit = 5): any[] {
    if (!this.citationIndex.has(ruleName)) {
      return [];
    }
    const precedentIds = this.citationIndex.get(ruleName)!;
    const precedents = precedentIds.map((id) => this.precedents.get(id));

    // Sort by weight and return top results
    return precedents.sort((a, b) => b.weight - a.weight).slice(0, limit);
  }
}
