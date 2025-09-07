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
        title: "The Future of AI in Small Business",
        description: "Exploring how even the smallest companies can leverage AI for significant growth.",
        image: "https://picsum.photos/600/400",
        tags: ["AI", "Business"],
        link: "#"
    },
    {
        title: "Navigating the Cloud: AWS vs Google Cloud",
        description: "A comprehensive comparison to help you choose the right cloud provider for your needs.",
        image: "https://picsum.photos/600/400",
        tags: ["Cloud", "DevOps"],
        link: "#"
    },
    {
        title: "Data-Driven Decisions: A Practical Guide",
        description: "Turn your data into actionable insights with these practical steps and tools.",
        image: "https://picsum.photos/600/400",
        tags: ["Data", "Analytics"],
        link: "#"
    }
]

export function FeaturedInsightsSection() {
  return (
    <section id="insights" className="py-16 md:py-24">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold">Featured Insights</h2>
          <p className="mt-4 text-muted-foreground">
            Stay ahead of the curve with our latest articles and analysis on technology and business.
          </p>
        </div>
        <div className="mt-12 grid lg:grid-cols-3 gap-8">
            {insights.map(insight => (
                <Card key={insight.title} className="overflow-hidden group">
                    <Image src={insight.image} width={600} height={400} alt={insight.title} data-ai-hint="technology abstract" className="w-full h-48 object-cover"/>
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
