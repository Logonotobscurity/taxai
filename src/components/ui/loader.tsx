import { cn } from '@/lib/utils';
import React from 'react';

// Define a separate style component for the keyframes and complex styles
const LoaderStyles = () => (
  <style>{`
    .pfile {
      position: absolute;
      bottom: 25px;
      width: 40px;
      height: 50px;
      background: linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)));
      border-radius: 4px;
      transform-origin: center;
      animation: flyRight 3s ease-in-out infinite;
      opacity: 0;
      animation-delay: calc(var(--i) * 0.6s);
    }
    .pfile::before {
      content: "";
      position: absolute;
      top: 6px;
      left: 6px;
      width: 28px;
      height: 4px;
      background-color: hsl(var(--primary-foreground));
      border-radius: 2px;
    }
    .pfile::after {
      content: "";
      position: absolute;
      top: 13px;
      left: 6px;
      width: 18px;
      height: 4px;
      background-color: hsl(var(--primary-foreground));
      border-radius: 2px;
    }
  `}</style>
);

interface FileLoaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function FileLoader({ className, ...props }: FileLoaderProps) {
  return (
    <>
      <LoaderStyles />
      <div
        className={cn('relative w-1/2 h-[100px] overflow-hidden', className)}
        {...props}
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="pfile"
            style={{ '--i': i } as React.CSSProperties}
          ></div>
        ))}
      </div>
    </>
  );
}
