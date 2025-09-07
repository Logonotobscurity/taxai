'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Play, AlertCircle } from 'lucide-react';

type FormulaEditorProps = {
  onExecute: (formula: string) => void;
  loading: boolean;
};

export function FormulaEditor({ onExecute, loading }: FormulaEditorProps) {
  const [formula, setFormula] = useState(
    'CALCULATE_PAYE(income, { pension: pension_deduction, nhf: nhf_deduction })'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onExecute(formula);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        value={formula}
        onChange={(e) => setFormula(e.target.value)}
        placeholder="e.g., SUM(income, -50000) * 0.075"
        rows={5}
        className="font-mono"
      />
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Sample Context</AlertTitle>
        <AlertDescription>
          You can use these variables in your formula:{' '}
          <code className="font-mono text-xs">income</code>,{' '}
          <code className="font-mono text-xs">nhf_deduction</code>,{' '}
          <code className="font-mono text-xs">pension_deduction</code>.
        </AlertDescription>
      </Alert>
      <Button type="submit" disabled={loading}>
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Play className="mr-2 h-4 w-4" />
        )}
        Execute Formula
      </Button>
    </form>
  );
}
