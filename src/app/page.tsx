import { ChatbotEmbedSection } from '@/components/landing/chatbot-embed';
import { FaqSection } from '@/components/landing/faq';
import { FeaturedInsightsSection } from '@/components/landing/featured-insights';
import { Footer } from '@/components/landing/footer';
import { GeneralistApproachSection } from '@/components/landing/generalist-approach';
import { Header } from '@/components/landing/header';
import { HeroSection } from '@/components/landing/hero';
import { StatementSection } from '@/components/landing/statement';
import { StrategicPartnerSection } from '@/components/landing/strategic-partner';
import { TechStackCarouselSection } from '@/components/landing/tech-stack-carousel';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <StrategicPartnerSection />
        <GeneralistApproachSection />
        <StatementSection />
        <FeaturedInsightsSection />
        <FaqSection />
        <ChatbotEmbedSection />
        <TechStackCarouselSection />
      </main>
      <Footer />
    </div>
  );
}
