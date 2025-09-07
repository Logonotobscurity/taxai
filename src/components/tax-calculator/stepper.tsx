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
        className="divide-y divide-border rounded-md border md:flex md:divide-y-0"
      >
        {steps.map((step, stepIdx) => (
          <li key={step.name} className="relative md:flex md:flex-1">
            {stepIdx < currentStep ? (
              <button
                onClick={() => setCurrentStep(stepIdx)}
                className="group flex w-full items-center"
              >
                <span className="flex items-center px-6 py-4 text-sm font-medium">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary group-hover:bg-primary/80">
                    <Check
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="ml-4 text-sm font-medium text-foreground">
                    {step.name}
                  </span>
                </span>
              </button>
            ) : stepIdx === currentStep ? (
              <button
                onClick={() => setCurrentStep(stepIdx)}
                className="flex items-center px-6 py-4 text-sm font-medium"
                aria-current="step"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-primary">
                  <span className="text-primary">{step.id}</span>
                </span>
                <span className="ml-4 text-sm font-medium text-primary">
                  {step.name}
                </span>
              </button>
            ) : (
              <button
                onClick={() => setCurrentStep(stepIdx)}
                className="group flex items-center"
              >
                <span className="flex items-center px-6 py-4 text-sm font-medium">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-border group-hover:border-muted-foreground">
                    <span className="text-muted-foreground">{step.id}</span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-muted-foreground group-hover:text-foreground">
                    {step.name}
                  </span>
                </span>
              </button>
            )}

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
