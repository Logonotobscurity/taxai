
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, BrainCircuit, Loader2, PieChart } from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Pie, PieChart as RechartsPieChart, Cell } from 'recharts';
import { useState } from 'react';
import Link from 'next/link';

const pieData = [
  { name: 'Take Home', value: 3817500, fill: 'hsl(var(--chart-2))' },
  { name: 'Total Tax', value: 782500, fill: 'hsl(var(--chart-1))' },
  { name: 'Pension', value: 400000, fill: 'hsl(var(--chart-3))' },
].filter((item) => item.value > 0);

const chartConfig = {
  takeHome: { label: 'Take Home', color: 'hsl(var(--chart-2))' },
  totalTax: { label: 'Total Tax', color: 'hsl(var(--chart-1))' },
  pension: { label: 'Pension', color: 'hsl(var(--chart-3))' },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

function MiniTaxCalculator() {
  const [income, setIncome] = useState<number | undefined>(5000000);
  const [estimatedTax, setEstimatedTax] = useState<number | null>(782500);
  const [loading, setLoading] = useState(false);

  const handleEstimate = () => {
    if (!income) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      // Simplified estimation logic for demo
      const tax = income * 0.15 + (income > 3000000 ? (income - 3000000) * 0.1 : 0);
      setEstimatedTax(tax);
      setLoading(false);
    }, 750);
  };

  return (
    <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={cardVariants}>
      <Card className="h-full flex flex-col justify-between shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
        <CardHeader>
          <CardTitle>Quick Tax Estimator</CardTitle>
          <CardDescription>
            Get an instant estimate of your annual tax.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-center">
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              type="number"
              placeholder="e.g., 5000000"
              className="flex-grow"
              value={income || ''}
              onChange={(e) => {
                setIncome(Number(e.target.value));
                setEstimatedTax(null);
              }}
            />
            <Button
              onClick={handleEstimate}
              disabled={loading || !income}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Estimate
            </Button>
          </div>
          <AnimatePresence>
            {estimatedTax !== null && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: '1rem' }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="text-center"
              >
                <p className="text-sm text-muted-foreground">Estimated Annual Tax</p>
                <p className="text-3xl font-bold text-primary">
                  ₦{estimatedTax.toLocaleString()}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter>
          <Button variant="link" className="p-0 h-auto" asChild>
            <Link href="/calculator">
              Go to Full Calculator <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

function TaxBreakdownChart() {
  return (
    <motion.div custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={cardVariants}>
      <Card className="h-full flex flex-col justify-between shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-6 w-6 text-primary" />
            Income Breakdown
          </CardTitle>
          <CardDescription>
            Visualize how your income is distributed after taxes and deductions.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center">
          <ChartContainer config={chartConfig} className="mx-auto aspect-square h-full max-h-[200px]">
            <RechartsPieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={80}
                strokeWidth={2}
              >
                {pieData.map((entry) => (
                  <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                ))}
              </Pie>
            </RechartsPieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
            <Button variant="link" className="p-0 h-auto" asChild>
                <Link href="/reports">
                    Explore Detailed Reports <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

function AiAdvisorCard() {
  return (
    <motion.div custom={2} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={cardVariants}>
        <Card className="h-full flex flex-col justify-between shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-primary/10 to-background">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BrainCircuit className="h-6 w-6 text-primary" />
                    AI-Powered Insights
                </CardTitle>
                <CardDescription>
                    Our AI analyzes your data to find personalized tax-saving opportunities.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-primary" />
                        <span>Optimize pension contributions.</span>
                    </li>
                    <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-primary" />
                        <span>Identify unclaimed tax reliefs.</span>
                    </li>
                    <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-primary" />
                        <span>Strategies for investment income.</span>
                    </li>
                </ul>
            </CardContent>
            <CardFooter>
                 <Button variant="link" className="p-0 h-auto" asChild>
                    <Link href="/ai-advisor">
                        Meet Your AI Advisor <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    </motion.div>
  );
}


export function FeaturesPreviewSection() {
    return (
        <section className="pt-0 pb-16 md:pb-24 bg-background">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                   <MiniTaxCalculator />
                   <TaxBreakdownChart />
                   <AiAdvisorCard />
                </div>
            </div>
        </section>
    )
}
