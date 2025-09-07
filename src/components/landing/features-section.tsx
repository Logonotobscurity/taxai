'use client';

import { Calculator, Bot, FileText, TrendingUp, Landmark, FunctionSquare } from 'lucide-react';

const features = [
  {
    name: 'AI-Powered Tax Calculation',
    description: 'Our AI provides detailed tax calculations leveraging the latest FIRS guidelines and tax laws, ensuring accuracy and compliance.',
    icon: Calculator,
  },
  {
    name: 'Personalized Tax Insights',
    description: 'Receive personalized insights based on your financial data to optimize tax liabilities and improve financial planning.',
    icon: Bot,
  },
  {
    name: 'Document Management',
    description: 'Upload and manage essential financial documents, receipts, and tax certificates in a secure, cloud-based repository.',
    icon: FileText,
  },
  {
    name: 'Tax Optimization Recommendations',
    description: 'Get clear, step-by-step tax optimization strategies to help you legally reduce your tax liabilities.',
    icon: TrendingUp,
  },
  {
    name: 'Dynamic Tax Constitution',
    description: 'Explore and understand the tax rules and judicial precedents that power our platform for full transparency.',
    icon: Landmark,
  },
  {
    name: 'Formula Sandbox',
    description: 'Create and test custom financial calculations and models using our powerful Excel-like formula engine.',
    icon: FunctionSquare,
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Your Financial Co-Pilot</h2>
          <p className="mt-2 font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need for seamless tax management
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            From automated calculations to expert AI advice, TaxAI is the all-in-one platform to take control of your finances.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col rounded-lg bg-card p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                  <feature.icon className="h-6 w-6 flex-none text-primary" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
