import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const insights = [
    {
        title: "FIRS Announces New Digital Filing Mandates for 2025",
        description: "Understand the upcoming changes to digital tax submissions and how TaxComply AI ensures you remain compliant with the new FIRS portal requirements.",
        image: "https://picsum.photos/600/401",
        tags: ["FIRS", "Compliance"],
        link: "#"
    },
    {
        title: "Unlocking a New Tax Incentive for Tech Startups",
        description: "A deep dive into the latest government incentive designed to foster growth in the tech sector. Learn if your business qualifies and how to apply.",
        image: "https://picsum.photos/600/402",
        tags: ["Incentives", "Startups"],
        link: "#"
    },
    {
        title: "Navigating Changes in Capital Gains Tax Regulations",
        description: "Recent amendments to the Capital Gains Tax Act could impact your investment strategy. Here's what you need to know to stay ahead.",
        image: "https://picsum.photos/600/403",
        tags: ["Tax Law", "Investment"],
        link: "#"
    }
]

export function FeaturedInsightsSection() {
  return (
    <section id="insights" className="py-16 md:py-24">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold">Latest Tax News & Insights</h2>
          <p className="mt-4 text-muted-foreground">
            Stay informed with the latest developments in Nigerian tax law and discover strategies to optimize your financial planning.
          </p>
        </div>
        <div className="mt-12 grid lg:grid-cols-3 gap-8">
            {insights.map((insight, index) => (
                <Card key={insight.title} className="overflow-hidden group">
                    <Image src={insight.image} width={600} height={400 + (index + 1)} alt={insight.title} data-ai-hint={index === 2 ? "investment stocks" : "financial charts"} className="w-full h-48 object-cover"/>
                    <CardHeader>
                        <div className="flex gap-2 mb-2">
                            {insight.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                        </div>
                        <CardTitle>{insight.title}</CardTitle>
                        <CardDescription className="line-clamp-3">{insight.description}</CardDescription>
                         <Link href={insight.link} className="flex items-center text-sm font-semibold text-primary mt-2">
                            Read More
                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </CardHeader>
                </Card>
            ))}
        </div>
        <div className="text-center mt-12">
            <Button variant="outline">View All Insights</Button>
        </div>
      </div>
    </section>
  );
}
