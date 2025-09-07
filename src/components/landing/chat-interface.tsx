
'use client';

import { useState } from 'react';
import { ChatInput } from '@/components/ui/chat-input';
import { Button } from '@/components/ui/button';
import {
  Paperclip,
  Mic,
  CornerDownLeft,
  Text,
  CheckCheck,
  ArrowDownWideNarrow,
  Loader2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { processTextAction } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const CUSTOM_ACTIONS = [
  {
    text: 'Summarize',
    icon: Text,
    colors: {
      icon: 'text-blue-600',
      border: 'border-blue-500',
      bg: 'bg-blue-100',
    },
  },
  {
    text: 'Proofread',
    icon: CheckCheck,
    colors: {
      icon: 'text-green-600',
      border: 'border-green-500',
      bg: 'bg-green-100',
    },
  },
  {
    text: 'Condense',
    icon: ArrowDownWideNarrow,
    colors: {
      icon: 'text-purple-600',
      border: 'border-purple-500',
      bg: 'bg-purple-100',
    },
  },
] as const; // Use "as const" for stronger typing on `text`

export function ChatInterfaceSection() {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const handleCustomAction = async (
    action: 'Summarize' | 'Proofread' | 'Condense'
  ) => {
    if (!value) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setActiveAction(action);

    try {
      const response = await processTextAction({ text: value, action });
      setResult(response.processedText);
    } catch (err) {
      setError('An error occurred while processing your request.');
      console.error(err);
    } finally {
      setLoading(false);
      setActiveAction(null);
    }
  };

  return (
    <section className="flex justify-center py-16 md:py-24">
      <div className="w-full max-w-4xl p-4">
        <form
          className="relative rounded-lg border bg-background p-1 focus-within:ring-1 focus-within:ring-ring"
          onSubmit={(e) => {
            e.preventDefault();
            console.log('Submitted:', value);
            // In a real app, you might want a default send action here.
          }}
        >
          <ChatInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type or paste your text here..."
            className="min-h-12 resize-none rounded-lg border-0 bg-background p-3 shadow-none focus-visible:ring-0"
          />
          <div className="flex flex-wrap items-center gap-2 p-3 pt-0">
            <Button variant="ghost" size="icon" type="button">
              <Paperclip className="size-4" />
              <span className="sr-only">Attach file</span>
            </Button>

            <Button variant="ghost" size="icon" type="button">
              <Mic className="size-4" />
              <span className="sr-only">Use Microphone</span>
            </Button>
            
            <div className="flex items-center gap-2">
                {CUSTOM_ACTIONS.map((action) => (
                <Button
                    key={action.text}
                    variant="outline"
                    type="button"
                    disabled={!value || loading}
                    className={cn(
                    'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all hover:shadow-lg',
                    action.colors.border,
                    action.colors.bg
                    )}
                    onClick={() => handleCustomAction(action.text)}
                >
                    {loading && activeAction === action.text ? (
                        <Loader2 className={cn('size-4 animate-spin', action.colors.icon)} />
                    ) : (
                        <action.icon className={cn('size-4', action.colors.icon)} />
                    )}
                    <span className={action.colors.icon}>{action.text}</span>
                </Button>
                ))}
            </div>

            <Button
              type="submit"
              size="sm"
              className="ml-auto gap-1.5"
              disabled={!value || loading}
            >
              Send
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </form>

        {error && (
            <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        
        {result && (
            <Alert className="mt-4">
                <Sparkles className="h-4 w-4" />
                <AlertTitle>AI Result</AlertTitle>
                <AlertDescription>
                    <pre className="whitespace-pre-wrap font-body">{result}</pre>
                </AlertDescription>
            </Alert>
        )}
      </div>
    </section>
  );
}
