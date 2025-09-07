'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getPersonalizedInsightsAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, Loader2, Sparkles } from 'lucide-react';

const mockNews = `- Nigeria raises interest rates to combat inflation.\n- New tax incentives announced for the agricultural sector.\n- FIRS launches new digital platform for tax filing.`;

const formSchema = z.object({
  financialData: z
    .string({ required_error: 'Financial data is required.' })
    .min(10, 'Please provide more detailed financial data.'),
  financialNews: z.string().optional(),
});

export function InsightsGenerator() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      financialData: '',
      financialNews: mockNews,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await getPersonalizedInsightsAction({
        financialData: values.financialData,
        financialNews: values.financialNews || mockNews,
      });
      setResult(res.insights);
    } catch (err) {
      setError('Failed to generate insights. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="financialData"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Financial Data</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your financial situation, e.g., income, investments, business activities..."
                    rows={6}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  The more detail you provide, the better the insights will be.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="financialNews"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Financial News (Mock Data)</FormLabel>
                <FormControl>
                  <Textarea rows={4} {...field} />
                </FormControl>
                <FormDescription>
                  The AI will use this context to provide timely advice.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Generate Insights
          </Button>
        </form>
      </Form>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <div className="mt-8">
          <h3 className="mb-4 flex items-center text-xl font-bold">
            <Lightbulb className="mr-2 h-5 w-5 text-yellow-400" />
            Personalized Insights
          </h3>
          <div className="prose prose-sm max-w-none rounded-md border bg-muted/50 p-4">
            <p>{result}</p>
          </div>
        </div>
      )}
    </div>
  );
}
