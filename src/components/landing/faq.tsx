import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle, ShieldCheck, Users, BrainCircuit } from 'lucide-react';

const faqItems = [
    {
        icon: HelpCircle,
        question: "What is TaxAI?",
        answer: "TaxAI is an AI-powered platform designed to simplify tax compliance for individuals and businesses in Nigeria. It provides instant tax calculations, personalized financial insights, and tools for document management and FIRS submissions, all based on the latest tax laws."
    },
    {
        icon: Users,
        question: "Who can use TaxAI?",
        answer: "TaxAI is built for a wide range of users, including salaried individuals, freelancers, small business owners, and finance professionals who need to manage their tax obligations accurately and efficiently."
    },
    {
        icon: ShieldCheck,
        question: "Is my financial data secure?",
        answer: "Yes, security is our top priority. We use industry-standard encryption and security protocols to protect your data. All information is stored securely, and we never share your data without your explicit consent."
    },
    {
        icon: BrainCircuit,
        question: "How accurate is the AI tax calculation?",
        answer: "Our AI is trained on the latest FIRS guidelines and Nigerian tax laws to ensure high accuracy. While TaxAI provides powerful tools and insights, we always recommend consulting with a qualified tax professional for complex financial decisions."
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
