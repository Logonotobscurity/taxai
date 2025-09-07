import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center bg-background p-4">
      <div className="circuit-background"></div>
      <div className="absolute top-4 left-4 z-10">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">TaxComply AI</span>
        </Link>
      </div>
      <div className="z-10 w-full max-w-md">{children}</div>
    </div>
  );
}
