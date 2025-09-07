'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Rocket, BarChart } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ONBOARDING_KEY = 'taxai_onboarding_complete';

export function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onboardingComplete = localStorage.getItem(ONBOARDING_KEY);

    const handleScroll = () => {
      // If the modal has been shown, or a timer is already set, do nothing.
      if (localStorage.getItem(ONBOARDING_KEY) || timeoutRef.current) {
        return;
      }

      // Set a timer to open the modal after 5 seconds
      timeoutRef.current = setTimeout(() => {
        setIsOpen(true);
      }, 5000);
    };

    if (!onboardingComplete) {
      window.addEventListener('scroll', handleScroll, { once: true });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleStart = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    setIsOpen(false);
    router.push('/calculator');
  };

  const handleExplore = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    setIsOpen(false);
    router.push('/dashboard');
  }

  const handleClose = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Rocket className="h-8 w-8 text-primary" />
            Welcome to TaxAI!
          </DialogTitle>
          <DialogDescription>
            Let&apos;s get you started. We recommend running your first tax calculation to see the power of our platform.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
            <p className="text-sm text-muted-foreground">You can either jump right into a new calculation or explore a sample dashboard with pre-filled data to see what&apos;s possible.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
            <Button onClick={handleStart} className="w-full">
                <Rocket className="mr-2 h-4 w-4" /> Start My First Calculation
            </Button>
            <Button onClick={handleExplore} variant="outline" className="w-full">
                <BarChart className="mr-2 h-4 w-4" /> Explore the Dashboard
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
