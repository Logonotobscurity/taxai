import { FileLoader } from '@/components/ui/loader';

export default function Loading() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <FileLoader />
      <div className="text-center">
        <p className="text-lg font-semibold text-foreground">Loading...</p>
        <p className="text-sm text-muted-foreground">
          Please wait while we prepare the page.
        </p>
      </div>
    </div>
  );
}
