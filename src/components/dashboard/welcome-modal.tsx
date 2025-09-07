'use client';

import { useState, useEffect } from 'react';
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

  useEffect(() => {
    // Check if the user has completed onboarding before
    const onboardingComplete = localStorage.getItem(ONBOARDING_KEY);
    if (!onboardingComplete) {
      setIsOpen(true);
    }
  }, []);

  const handleStart = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    setIsOpen(false);
    router.push('/calculator');
  };

  const handleClose = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Rocket className="h-8 w-8 text-primary" />
            Welcome to TaxAI!
          </DialogTitle>
          <DialogDescription>
            Let's get you started. We recommend running your first tax calculation to see the power of our platform.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <p>You can either jump right into a new calculation or explore a sample dashboard with pre-filled data to see what's possible.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={handleStart} className="w-full gradient-primary">
                <Rocket className="mr-2 h-4 w-4" /> Start My First Calculation
            </Button>
            <Button onClick={handleClose} variant="outline" className="w-full">
                <BarChart className="mr-2 h-4 w-4" /> Explore the Dashboard
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
