'use client';

import { useEffect, useState } from 'react';
import type { z } from 'zod';
import {
  TrendingUp,
  TrendingDown,
  Landmark,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { calculateTaxAction } from '@/app/actions';
import type { TaxFormSchema } from '@/lib/schemas';
import type { CalculateTaxWithRulesOutput } from '@/ai/flows/calculate-tax-with-rules';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Pie, PieChart, Cell } from 'recharts';

type TaxResultsProps = {
  taxData: z.infer<typeof TaxFormSchema> | null;
  onCalculationComplete: (results: CalculateTaxWithRulesOutput) => void;
  onNext: () => void;
  onBack: () => void;
};

const LoadingSkeleton = () => (
  <div className="space-y-6">
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Skeleton className="h-28" />
      <Skeleton className="h-28" />
      <Skeleton className="h-28" />
      <Skeleton className="h-28" />
    </div>
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Skeleton className="h-80" />
      <Skeleton className="h-80" />
    </div>
  </div>
);

export function TaxResults({
  taxData,
  onCalculationComplete,
  onNext,
  onBack,
}: TaxResultsProps) {
  const [results, setResults] = useState<CalculateTaxWithRulesOutput | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function calculate() {
      if (!taxData) {
        setError('No tax data provided.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const result = await calculateTaxAction(taxData);
        setResults(result);
      } catch (e) {
        setError('An error occurred during calculation.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    calculate();
  }, [taxData]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!results) {
    return (
      <Alert>
        <AlertTitle>No Results</AlertTitle>
        <AlertDescription>
          Could not retrieve calculation results.
        </AlertDescription>
      </Alert>
    );
  }

  const handleProceed = () => {
    onCalculationComplete(results);
  };

  const pieData = [
    { name: 'Take Home', value: results.takeHome, fill: 'hsl(var(--chart-2))' },
    { name: 'Total Tax', value: results.totalTax, fill: 'hsl(var(--chart-1))' },
    { name: 'Pension', value: results.pensionDeduction, fill: 'hsl(var(--chart-3))' },
    { name: 'NHF', value: results.nhfDeduction, fill: 'hsl(var(--chart-4))' },
  ].filter(item => item.value > 0);
  
  const chartConfig = {
    takeHome: { label: "Take Home", color: "hsl(var(--chart-2))" },
    totalTax: { label: "Total Tax", color: "hsl(var(--chart-1))" },
    pension: { label: "Pension", color: "hsl(var(--chart-3))" },
    nhf: { label: "NHF", color: "hsl(var(--chart-4))" },
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Annual Take Home</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{results.takeHome.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tax</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{results.totalTax.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Effective Tax Rate</CardTitle>
            <Landmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{results.effectiveRate.toFixed(1)}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Take Home</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₦{(results.takeHome / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Detailed Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex justify-between">
                <p>Gross Annual Income</p>
                <p className='font-medium'>₦{taxData?.income?.toLocaleString()}</p>
             </div>
             <div className="flex justify-between">
                <p>Pension Deduction</p>
                <p className='font-medium'>- ₦{results.pensionDeduction.toLocaleString()}</p>
             </div>
             <div className="flex justify-between">
                <p>NHF Deduction</p>
                <p className='font-medium'>- ₦{results.nhfDeduction.toLocaleString()}</p>
             </div>
             <div className="flex justify-between text-lg font-semibold">
                <p>Taxable Income</p>
                <p>₦{results.taxableIncome.toLocaleString()}</p>
             </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Income Distribution</CardTitle>
            </CardHeader>
            <CardContent>
            <ChartContainer config={chartConfig} className="mx-auto aspect-square h-full max-h-[250px]">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80}>
                   {pieData.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            </CardContent>
        </Card>
      </div>
      
      <Card>
          <CardHeader>
              <CardTitle>Tax Brackets</CardTitle>
          </CardHeader>
          <CardContent>
              <div className="space-y-2">
                  {results.taxBrackets.map((bracket, index) => (
                      <div key={index} className="flex flex-col items-start justify-between gap-2 rounded-md p-2 even:bg-muted/50 sm:flex-row sm:items-center">
                          <div>
                              <p className="font-medium">{bracket.range}</p>
                              <p className="text-sm text-muted-foreground">Rate: {bracket.rate}%</p>
                          </div>
                          <Badge variant="secondary" className="text-base">₦{bracket.tax.toLocaleString()}</Badge>
                      </div>
                  ))}
              </div>
          </CardContent>
      </Card>


      {results.aiRecommendations?.length > 0 && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>AI Optimization Opportunities Found!</AlertTitle>
          <AlertDescription>
            Our AI has identified {results.aiRecommendations.length} potential tax optimization
            strategies. Proceed to the next step for a detailed analysis.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-between">
        <Button variant="outline" onClick={onBack} size="lg">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Input
        </Button>
        <Button onClick={handleProceed} size="lg">
          View AI Insights
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
