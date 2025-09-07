
'use client';

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  ChangeEvent,
} from 'react';
import {
  processTextAction,
  analyzeDocumentAction,
  getPersonalizedInsightsAction,
} from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Paperclip,
  ArrowUp,
  BrainCircuit,
  FileText,
  Percent,
  Sparkles,
  Loader2,
  AlertCircle,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '../ui/badge';

// Custom hook to auto-resize textarea
function useAutoResizeTextarea({
  minHeight,
  maxHeight,
}: {
  minHeight: number;
  maxHeight?: number;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      if (reset) {
        textarea.style.height = `${minHeight}px`;
        return;
      }

      // Temporarily shrink to get the right scrollHeight
      textarea.style.height = 'auto';

      const newHeight = Math.max(
        minHeight,
        Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY)
      );

      textarea.style.height = `${newHeight}px`;
    },
    [minHeight, maxHeight]
  );

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = `${minHeight}px`;
    }
  }, [minHeight]);

  return { textareaRef, adjustHeight };
}

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

function ActionButton({ icon, label, onClick }: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-2 bg-background hover:bg-muted rounded-full border text-muted-foreground hover:text-foreground transition-colors"
    >
      {icon}
      <span className="text-xs">{label}</span>
    </button>
  );
}

export function ChatInterfaceSection() {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 52,
    maxHeight: 250,
  });
  
  const handleAction = async (
    action: 'Summarize' | 'Insight' | 'Send'
  ) => {
    if (!value && !file) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
        let response;
        if (file) {
            // Handle file-based actions
            const documentDataUri = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target?.result as string);
                reader.onerror = (e) => reject(e);
                reader.readAsDataURL(file);
            });
            const query = value || `Analyze this document.`;
            response = await analyzeDocumentAction({ documentDataUri, query });
            setResult(response.analysis);

        } else {
             // Handle text-based actions
            if (action === 'Insight' || action === 'Send') {
                response = await getPersonalizedInsightsAction({ financialData: value, financialNews: '' });
                setResult(response.insights);
            } else if (action === 'Summarize') {
                response = await processTextAction({ text: value, action: 'Summarize' });
                setResult(response.processedText);
            }
        }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() || file) {
        handleAction('Send');
      }
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const predefinedActions = [
    {
      icon: <FileText className="w-4 h-4" />,
      label: 'Analyze a Payslip',
      prompt: 'Analyze this payslip and extract the gross income, total deductions, and net pay.',
    },
    {
      icon: <Percent className="w-4 h-4" />,
      label: 'Explain a Deduction',
      prompt: 'What is a consolidated relief allowance and how is it calculated?',
    },
    {
        icon: <BrainCircuit className="w-4 h-4" />,
        label: "Get Tax Insight",
        action: () => handleAction('Insight'),
    },
    {
        icon: <FileText className="w-4 h-4" />,
        label: "Summarize Text",
        action: () => handleAction('Summarize'),
    }
  ];

  return (
    <section className="flex flex-col items-center w-full max-w-4xl mx-auto pt-0 pb-16 md:pb-24 space-y-8 px-4">
      <div className="w-full">
        <form
          className="relative bg-background rounded-xl border"
          onSubmit={(e) => { e.preventDefault(); handleAction('Send'); }}
        >
          <div className="p-1.5">
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                adjustHeight();
              }}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question, paste text, or upload a document to get started..."
              className={cn(
                'w-full px-3 py-3',
                'resize-none',
                'bg-transparent',
                'border-none',
                'text-foreground text-sm',
                'focus:outline-none',
                'focus-visible:ring-0 focus-visible:ring-offset-0',
                'placeholder:text-muted-foreground',
                'min-h-[52px]'
              )}
              style={{ overflow: 'hidden' }}
            />
            {file && (
              <div className="px-3 pb-2">
                <Badge variant="secondary" className="flex items-center gap-2 max-w-xs">
                  <span className="truncate">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="focus:outline-none"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-2">
               <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*,application/pdf"
               />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip className="w-4 h-4" />
                <span className="sr-only">Attach File</span>
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="submit"
                size="icon"
                disabled={loading || (!value.trim() && !file)}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowUp className="w-4 h-4" />}
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </div>
        </form>

        <div className="flex items-center justify-center flex-wrap gap-3 mt-4">
          {predefinedActions.map(({ icon, label, prompt, action }) => (
            <ActionButton
              key={label}
              icon={icon}
              label={label}
              onClick={() => {
                if (action) {
                    action();
                } else if (prompt) {
                    setValue(prompt);
                    // Manually trigger adjustHeight as value is set programmatically
                    setTimeout(() => adjustHeight(), 0);
                }
              }}
            />
          ))}
        </div>

        <div className="mt-6">
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
      </div>
    </section>
  );
}

    