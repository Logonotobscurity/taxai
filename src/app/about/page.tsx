import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { ArrowRight, Briefcase, Lightbulb, Users } from 'lucide-react';
import Image from 'next/image';

const teamMembers = [
  {
    name: 'Jane Doe',
    role: 'Founder & CEO',
    avatar: 'https://picsum.photos/100/100?a=1',
  },
  {
    name: 'John Smith',
    role: 'Lead Tax Strategist',
    avatar: 'https://picsum.photos/100/100?a=2',
  },
  {
    name: 'Emily White',
    role: 'Head of AI Development',
    avatar: 'https://picsum.photos/100/100?a=3',
  },
  {
    name: 'Michael Brown',
    role: 'Client Success Manager',
    avatar: 'https://picsum.photos/100/100?a=4',
  },
];

const values = [
    {
        icon: Lightbulb,
        title: "Innovation",
        description: "We are committed to leveraging cutting-edge AI to solve complex tax challenges in new and efficient ways."
    },
    {
        icon: Users,
        title: "Customer-Centric",
        description: "Our users are at the heart of everything we do. We build tools that are intuitive, powerful, and reliable."
    },
    {
        icon: Briefcase,
        title: "Integrity",
        description: "We uphold the highest standards of data security and professional ethics to ensure your peace of mind."
    }
]

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-secondary/20 py-20 md:py-32">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            We're simplifying tax compliance for everyone.
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            TaxComply AI was founded on the belief that managing taxes shouldn't be a source of stress. We're a passionate team of technologists, tax experts, and innovators dedicated to building the future of financial compliance.
          </p>
        </div>
      </section>

      {/* Values Section */}
       <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight">Our Core Values</h2>
            <p className="mt-4 text-muted-foreground">The principles that guide our mission and our work.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {values.map((value) => (
                 <Card key={value.title} className="text-center">
                    <CardHeader>
                        <div className="flex justify-center mb-4">
                            <value.icon className="h-12 w-12 text-primary" />
                        </div>
                        <CardTitle>{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                 </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-secondary/20 py-16 md:py-24">
        <div className="container px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Meet the Innovators
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              The expert team behind TaxComply AI's success.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((person) => (
              <div key={person.name} className="text-center">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src={person.avatar} alt={person.name} data-ai-hint="avatar person" />
                  <AvatarFallback>{person.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <h3 className="mt-4 text-lg font-semibold">{person.name}</h3>
                <p className="text-primary">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto max-w-4xl text-center px-4">
          <h2 className="text-3xl font-bold tracking-tight">
            Ready to Transform Your Tax Experience?
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Join thousands of users who trust TaxComply AI for accurate, efficient, and intelligent tax management.
          </p>
          <div className="mt-10">
            <Button asChild size="lg">
              <Link href="/dashboard">
                Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
