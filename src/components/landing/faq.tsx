import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle, Clock, DollarSign, Users } from 'lucide-react';

const faqItems = [
    {
        icon: HelpCircle,
        question: "What kind of companies do you work with?",
        answer: "We work with a wide range of companies, from early-stage startups to established enterprises, across various industries. Our ideal partner is any business looking to leverage technology for growth and efficiency."
    },
    {
        icon: Clock,
        question: "How long does a typical project take?",
        answer: "Project timelines vary depending on the scope and complexity. A small assessment might take a week, while a custom software build could take several months. We always provide a detailed timeline after the initial discovery phase."
    },
    {
        icon: DollarSign,
        question: "What are your pricing models?",
        answer: "We offer flexible pricing models, including project-based fees, monthly retainers for ongoing support, and corporate training packages. We work with you to find a model that fits your budget and needs."
    },
    {
        icon: Users,
        question: "Do you provide ongoing support after a project is complete?",
        answer: "Yes, we believe in long-term partnerships. We offer various levels of ongoing support and maintenance to ensure your solutions continue to perform optimally and evolve with your business."
    }
]

export function FaqSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary/20">
      <div className="container max-w-3xl mx-auto">
        <div className="text-center">
            <h2 className="text-2xl md:text-4xl font-bold">Frequently Asked Questions</h2>
        </div>
        <Accordion type="single" collapsible className="w-full mt-8">
            {faqItems.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger>
                        <div className="flex items-center gap-4">
                           <item.icon className="h-5 w-5 text-primary"/>
                           <span className="text-left">{item.question}</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                        {item.answer}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </div>
    </section>
  );
}
