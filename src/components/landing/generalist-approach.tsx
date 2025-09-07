import { Briefcase, ShieldCheck, PieChart } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const roles = [
    {
        icon: Briefcase,
        title: "For Business Owners",
        description: "Streamline your tax operations with AI-powered insights that maximize compliance while minimizing liabilities.",
        benefits: [
            "Reduce tax preparation time by up to 70%",
            "Real-time compliance monitoring",
            "Financial hedging against currency fluctuations"
        ]
    },
    {
        icon: ShieldCheck,
        title: "For Tax Compliance Officers",
        description: "Ensure 100% FIRS compliance with automated validation and direct API integration.",
        benefits: [
            "Automated compliance with 2025 Tax Reform Acts",
            "Direct FIRS API integration for real-time submissions",
            "Comprehensive audit trail and documentation"
        ]
    },
    {
        icon: PieChart,
        title: "For Finance Managers",
        description: "Accurate financial forecasting with advanced tax calculations and reporting capabilities.",
        benefits: [
            "Precise tax liability calculations",
            "Automated refund processing and tracking",
            "Comprehensive financial reporting"
        ]
    }
]

export function GeneralistApproachSection() {
  return (
    <section className="w-full bg-secondary/20 py-16 md:py-24">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold">A Platform Tailored for Your Role</h2>
            <p className="mt-4 text-muted-foreground">
                Whether you're steering the business, ensuring compliance, or managing finances, TaxAI provides the tools you need to succeed.
            </p>
        </div>
        <div className="mt-12 grid lg:grid-cols-3 gap-8">
            {roles.map((role) => (
                <Card key={role.title} className="flex flex-col bg-background/80 backdrop-blur-sm transition-all hover:scale-105">
                    <CardHeader>
                        <role.icon className="h-10 w-10 text-primary mb-4" />
                        <CardTitle>{role.title}</CardTitle>
                        <CardDescription>{role.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            {role.benefits.map((benefit) => (
                                <li key={benefit} className="flex items-start">
                                    <ShieldCheck className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-primary" />
                                    <span>{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
