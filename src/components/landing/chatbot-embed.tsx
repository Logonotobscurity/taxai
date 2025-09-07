'use client';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function ShareModal() {
  // Dummy component for the spec
  return <Button variant="ghost" size="sm">Share</Button>;
}

export function ChatbotEmbedSection() {
  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="container max-w-4xl mx-auto">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Talk to Our AI Assistant</CardTitle>
            <ShareModal />
          </CardHeader>
          <CardContent>
            <div className="aspect-video w-full">
              <iframe
                src="https://mediafiles.botpress.cloud/1f114194-a10c-43d5-812d-453b3d92b952/webchat/bot.html"
                width="100%"
                height="100%"
                className="rounded-md border"
                title="LOG_ON AI Assistant"
              ></iframe>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              Curious how we build our AI? Check out our{' '}
              <Link href="#" className="underline">A/B Testing page</Link>.
            </p>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
