'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FormulaEditor } from '@/components/formula-editor/formula-editor';
import { executeFormulaAction } from '@/app/actions';
import { NlInput } from '@/components/formula-editor/nl-input';

export default function FormulaSandboxPage() {
  const [result, setResult] = useState<string | number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formula, setFormula] = useState(
    'CALCULATE_PAYE(income, { pension: pension_deduction, nhf: nhf_deduction })'
  );

  const handleFormulaExecution = async (execFormula: string) => {
    if (!execFormula) {
      setResult(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const context = {
        income: 5000000,
        nhf_deduction: 125000,
        pension_deduction: 400000,
      };
      const res = await executeFormulaAction(execFormula, context);
      setResult(res);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Formula Sandbox</CardTitle>
          <CardDescription>
            Test and run custom financial calculations. Describe what you want
            to calculate in plain English, or write your own Excel-like formula.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <NlInput onFormulaGenerated={setFormula} />
          <FormulaEditor
            formula={formula}
            setFormula={setFormula}
            onExecute={handleFormulaExecution}
            loading={loading}
          />
        </CardContent>
      </Card>

      {(result !== null || error) && (
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            {loading && !error ? (
              <p>Calculating...</p>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              <div className="text-2xl font-bold">
                {typeof result === 'number'
                  ? result.toLocaleString()
                  : result}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
