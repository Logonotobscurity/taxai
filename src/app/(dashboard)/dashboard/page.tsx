'use client';

import Link from 'next/link';
import {
  ArrowUpRight,
  Calculator,
  Lightbulb,
  FileText,
  CreditCard,
  Rocket,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { QuickTaxEstimator } from '@/components/dashboard/quick-tax-estimator';
import { motion } from 'framer-motion';

const chartData = [
  { month: 'January', tax: 186000, income: 800000 },
  { month: 'February', tax: 305000, income: 1200000 },
  { month: 'March', tax: 237000, income: 950000 },
  { month: 'April', tax: 273000, income: 1100000 },
  { month: 'May', tax: 209000, income: 890000 },
  { month: 'June', tax: 214000, income: 910000 },
];

const chartConfig = {
  tax: {
    label: 'Tax Paid',
    color: 'hsl(var(--primary))',
  },
  income: {
    label: 'Gross Income',
    color: 'hsl(var(--accent))',
  },
};

export default function Dashboard() {
  const formatCurrency = (value: number) => `₦${(value / 1000).toFixed(0)}k`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex w-full flex-col"
    >
      <main className="flex flex-1 flex-col gap-4 md:gap-8">
        <div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-3">
          {/* Main Interactive Element */}
          <div className="lg:col-span-2">
            <QuickTaxEstimator />
          </div>

          {/* Supporting Info Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
             <Card className="transition-all hover:shadow-md hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Next Submission Due
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">July 31, 2024</div>
                <p className="text-xs text-muted-foreground">VAT Return</p>
              </CardContent>
            </Card>
            <Card className="transition-all hover:shadow-md hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  AI Recommendations
                </CardTitle>
                <Lightbulb className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3 Active</div>
                <p className="text-xs text-muted-foreground">
                  Potential savings: ₦12,500
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2 transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Tax Overview</CardTitle>
                <CardDescription>
                  Monthly tax payments vs. gross income for the last 6 months.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/reports">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-80 w-full">
                <BarChart
                  data={chartData}
                  margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                >
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    tickFormatter={formatCurrency}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value, name) =>
                          `${name}: ₦${Number(value).toLocaleString()}`
                        }
                      />
                    }
                    cursor={{
                      fill: 'hsl(var(--muted))',
                      radius: 'var(--radius)',
                    }}
                  />
                  <Bar
                    dataKey="tax"
                    fill="var(--color-tax)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="income"
                    fill="var(--color-income)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className="transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                A log of your recent tax-related activities.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex items-center gap-4">
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    PAYE Return Filed
                  </p>
                  <p className="text-sm text-muted-foreground">
                    June 2024 monthly return
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  <Badge variant="secondary">Completed</Badge>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    AI Insight Generated
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Pension contribution optimization
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  <Badge className="bg-accent text-accent-foreground">New</Badge>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Document Uploaded
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Receipt_2024_06_15.pdf
                  </p>
                </div>
                <div className="ml-auto font-medium text-muted-foreground">
                  2 days ago
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    WHT Filed
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Invoice #INV-007 for Client Corp
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  <Badge variant="secondary">Completed</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </motion.div>
  );
}
