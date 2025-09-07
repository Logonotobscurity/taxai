import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

type Step = {
  id: string;
  name: string;
  href: string;
};

type StepperProps = {
  steps: Step[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
};

export function Stepper({ steps, currentStep, setCurrentStep }: StepperProps) {
  return (
    <nav aria-label="Progress">
      <ol
        role="list"
        className="divide-y divide-border rounded-lg border md:flex md:divide-y-0"
      >
        {steps.map((step, stepIdx) => (
          <li key={step.name} className="relative md:flex md:flex-1">
            <button
              onClick={() => setCurrentStep(stepIdx)}
              className="group flex w-full items-center"
              disabled={stepIdx > currentStep}
            >
              <span className="flex items-center px-4 py-4 text-sm font-medium md:px-6">
                {stepIdx < currentStep ? (
                   <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary group-hover:bg-primary/80 md:h-10 md:w-10">
                   <Check
                     className="h-5 w-5 text-white md:h-6 md:w-6"
                     aria-hidden="true"
                   />
                 </span>
                ) : (
                  <span className={cn(
                    "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 md:h-10 md:w-10",
                    stepIdx === currentStep ? "border-primary text-primary" : "border-border group-hover:border-muted-foreground text-muted-foreground"
                  )}>
                    {step.id}
                  </span>
                )}
                <span className={cn(
                  "ml-4 text-sm font-medium",
                  stepIdx === currentStep ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )}>
                  {step.name}
                </span>
              </span>
            </button>

            {stepIdx !== steps.length - 1 ? (
              <div
                className="absolute right-0 top-0 hidden h-full w-5 md:block"
                aria-hidden="true"
              >
                <svg
                  className="h-full w-full text-border"
                  viewBox="0 0 22 80"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0.5 0V30L10.5 40L0.5 50V80"
                    stroke="currentcolor"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
