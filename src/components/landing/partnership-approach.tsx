'use client';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';

const caseStudies = [
  {
    client: 'Fintech Startup',
    study:
      'We implemented a custom AI-powered fraud detection system, reducing fraudulent transactions by 60% and saving the company over $2M annually.',
  },
  {
    client: 'Healthcare Provider',
    study:
      'Developed a HIPAA-compliant patient management platform, improving operational efficiency by 40% and enhancing patient data security.',
  },
  {
    client: 'E-commerce Brand',
    study:
      'Built a scalable cloud infrastructure on AWS, enabling the client to handle a 500% increase in traffic during peak season without downtime.',
  },
];

function CaseStudiesCarousel() {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {caseStudies.map((study, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <p className="text-lg text-muted-foreground">"{study.study}"</p>
              <p className="mt-4 font-bold">- {study.client}</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2" />
      <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2" />
    </Carousel>
  );
}

export function PartnershipApproachSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h3 className="text-xl font-bold">Trusted by Industry Leaders</h3>
          <div className="flex flex-wrap gap-8 items-center">
             <div className="flex items-center gap-2">
                <Image src="https://picsum.photos/32/32" width={32} height={32} alt="Google Cloud" className="rounded-full" data-ai-hint="logo" />
                <span>Google Cloud</span>
             </div>
             <div className="flex items-center gap-2">
                <Image src="https://picsum.photos/32/32" width={32} height={32} alt="AWS" className="rounded-full" data-ai-hint="logo" />
                <span>AWS</span>
             </div>
          </div>
          <Button size="lg">Start a Project</Button>
        </div>
        <div>
          <CaseStudiesCarousel />
        </div>
      </div>
    </section>
  );
}
