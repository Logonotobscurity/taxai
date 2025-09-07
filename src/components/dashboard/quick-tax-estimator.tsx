'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import { TaxRulesEngine } from '@/services/tax-rules-engine';
import { TaxCalculationService } from '@/services/tax-calculation-service';
import { AnimatePresence, motion } from 'framer-motion';

export function QuickTaxEstimator() {
  const [income, setIncome] = useState<number | undefined>();
  const [estimatedTax, setEstimatedTax] = useState<number | null>(null);
  const [estimatedTakeHome, setEstimatedTakeHome] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEstimate = async () => {
    if (!income) return;
    setLoading(true);
    
    // This is a simplified, client-side estimation.
    // We can do this because the rules engine logic is portable.
    // In a real app, you might use a server action for consistency.
    try {
        const rulesEngine = new TaxRulesEngine();
        await rulesEngine.loadRules('2024'); // Use a default year for estimation
        const taxService = new TaxCalculationService(rulesEngine);

        const results = taxService.calculatePAYE({ income });
        
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
        setEstimatedTax(results.totalTax);
        setEstimatedTakeHome(results.takeHome);

    } catch (error) {
        console.error("Estimation failed:", error);
        // Handle error, maybe show a toast
    }

    setLoading(false);
  };

  const handleDetailedCalculation = () => {
    const params = new URLSearchParams();
    if(income) {
        params.set('income', income.toString());
    }
    router.push(`/calculator?${params.toString()}`);
  }

  return (
    <Card className="h-full flex flex-col justify-between bg-gradient-to-br from-secondary to-green-800 text-secondary-foreground shadow-lg transition-all hover:shadow-xl">
      <CardHeader>
        <CardTitle className="text-3xl">Quick Tax Estimator</CardTitle>
        <CardDescription className="text-secondary-foreground/80">
          Get an instant estimate of your annual tax liability. Enter your gross
          annual income to begin.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-center">
        {estimatedTax === null ? (
          <div className="flex flex-col gap-4 sm:flex-row">
            <Input
              type="number"
              placeholder="e.g., 5000000"
              className="flex-grow text-foreground"
              value={income || ''}
              onChange={(e) => setIncome(Number(e.target.value))}
              onKeyDown={(e) => e.key === 'Enter' && handleEstimate()}
            />
            <Button
              size="lg"
              onClick={handleEstimate}
              disabled={loading || !income}
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Estimate Now
            </Button>
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                    <div>
                        <p className="text-sm text-secondary-foreground/80">Estimated Tax</p>
                        <p className="text-3xl font-bold">₦{estimatedTax.toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="text-sm text-secondary-foreground/80">Estimated Take-Home</p>
                        <p className="text-3xl font-bold">₦{estimatedTakeHome?.toLocaleString()}</p>
                    </div>
                </div>
                 <Button
                    size="lg"
                    onClick={handleDetailedCalculation}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg mt-4"
                >
                    View Detailed Breakdown
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </motion.div>
          </AnimatePresence>
        )}
      </CardContent>
    </Card>
  );
}
