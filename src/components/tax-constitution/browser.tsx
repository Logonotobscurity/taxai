'use client';

import { useState, useEffect } from 'react';
import { getTaxRulesAction, getPrecedentsForRuleAction } from '@/app/actions';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Gavel } from 'lucide-react';

type Rule = {
  id: string;
  description: string;
  category: string;
  source: string;
  effectiveDate: string;
  expirationDate?: string | null;
  function: any;
};

type Precedent = {
  id: string;
  caseName: string;
  citation: string;
  summary: string;
  decisionDate: string;
};

export function TaxConstitutionBrowser({ taxYear = '2025' }) {
  const [rules, setRules] = useState<Rule[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const [precedents, setPrecedents] = useState<Precedent[]>([]);
  const [precedentsLoading, setPrecedentsLoading] = useState(false);

  useEffect(() => {
    async function loadRules() {
      setLoading(true);
      try {
        const rulesData = await getTaxRulesAction(taxYear);
        setRules(rulesData);
      } catch (error) {
        console.error('Failed to load rules:', error);
      } finally {
        setLoading(false);
      }
    }
    loadRules();
  }, [taxYear]);

  const categories = [...new Set(rules.map((rule) => rule.category))];

  const filteredRules = rules.filter((rule) => {
    const matchesCategory =
      selectedCategory === 'all' || rule.category === selectedCategory;
    const matchesSearch =
      !searchTerm ||
      rule.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleRuleSelect = async (rule: Rule) => {
    setSelectedRule(rule);
    setPrecedentsLoading(true);
    setPrecedents([]);
    try {
      const precedentData = await getPrecedentsForRuleAction(rule.id);
      setPrecedents(precedentData);
    } catch (error) {
      console.error('Failed to load precedents:', error);
    } finally {
      setPrecedentsLoading(false);
    }
  };

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="md:col-span-1">
        <Skeleton className="mb-4 h-10 w-full" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-8 w-2/3" />
        </div>
      </div>
      <div className="md:col-span-2 space-y-2">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    </div>
  );

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
      <aside className="lg:col-span-1 md:col-span-3 space-y-4">
        <div>
          <label className="text-sm font-medium">Search Rules</label>
          <Input
            type="text"
            placeholder="e.g., Consolidated Relief"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Filter by Category</label>
          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </aside>

      <div className="md:col-span-3 lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:col-span-1 space-y-2 max-h-[60vh] overflow-y-auto pr-2">
          <h3 className="text-lg font-semibold">
            Tax Rules ({filteredRules.length})
          </h3>
          {filteredRules.map((rule) => (
            <div
              key={rule.id}
              className={`cursor-pointer rounded-md border p-4 transition-all hover:bg-muted/50 ${
                selectedRule?.id === rule.id
                  ? 'bg-muted ring-2 ring-primary'
                  : ''
              }`}
              onClick={() => handleRuleSelect(rule)}
            >
              <h4 className="font-semibold">{rule.id}</h4>
              <p className="text-sm text-muted-foreground">
                {rule.description}
              </p>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          {selectedRule ? (
            <div className="sticky top-20">
              <Card>
                <CardHeader>
                  <CardTitle>{selectedRule.id}</CardTitle>
                  <CardDescription>{selectedRule.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge>Source: {selectedRule.source}</Badge>
                    <Badge variant="secondary">
                      Effective:{' '}
                      {new Date(selectedRule.effectiveDate).toLocaleDateString()}
                    </Badge>
                    {selectedRule.expirationDate && (
                      <Badge variant="outline">
                        Expires:{' '}
                        {new Date(
                          selectedRule.expirationDate
                        ).toLocaleDateString()}
                      </Badge>
                    )}
                  </div>
                  <div>
                    <h4 className="mb-2 flex items-center font-semibold">
                      <Gavel className="mr-2 h-5 w-5" />
                      Judicial Precedents
                    </h4>
                    {precedentsLoading ? (
                      <div className="space-y-2">
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                      </div>
                    ) : precedents.length > 0 ? (
                      <div className="space-y-2">
                        {precedents.map((p) => (
                          <div
                            key={p.id}
                            className="rounded-md bg-muted/50 p-3 text-sm"
                          >
                            <p className="font-semibold">{p.caseName}</p>
                            <p className="text-xs text-muted-foreground">
                              {p.citation} -{' '}
                              {new Date(p.decisionDate).toLocaleDateString()}
                            </p>
                            <p className="mt-1">{p.summary}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No relevant precedents found for this rule.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center rounded-md border-2 border-dashed">
              <p className="text-muted-foreground">
                Select a rule to see details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
