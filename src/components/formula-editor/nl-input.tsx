'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';
import { generateFormulaAction } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type NlInputProps = {
  onFormulaGenerated: (formula: string) => void;
};

export function NlInput({ onFormulaGenerated }: NlInputProps) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!query) return;
    setLoading(true);
    setError(null);
    try {
      const context = {
        income: 5000000,
        nhf_deduction: 125000,
        pension_deduction: 400000,
      };
      const result = await generateFormulaAction(query, context);
      onFormulaGenerated(result.formula);
    } catch (err) {
      setError('Failed to generate formula. Please try a different query.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex w-full items-center space-x-2">
        <Input
          type="text"
          placeholder="e.g., Calculate 7.5% of income minus pension"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
        />
        <Button onClick={handleGenerate} disabled={loading || !query}>
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          Generate
        </Button>
      </div>
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
