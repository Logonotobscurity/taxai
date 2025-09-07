
'use client';

import { useState, useRef, useEffect } from 'react';
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
  BrainCircuit,
  X,
  MicOff,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { processTextAction, analyzeDocumentAction, getPersonalizedInsightsAction } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '../ui/badge';

const CUSTOM_ACTIONS = [
  {
    text: 'Summarize',
    icon: Text,
    action: 'Summarize',
    colors: {
      icon: 'text-blue-600',
      border: 'border-blue-500',
      bg: 'bg-blue-100',
    },
  },
  {
    text: 'Proofread',
    icon: CheckCheck,
    action: 'Proofread',
    colors: {
      icon: 'text-green-600',
      border: 'border-green-500',
      bg: 'bg-green-100',
    },
  },
  {
    text: 'Condense',
    icon: ArrowDownWideNarrow,
    action: 'Condense',
    colors: {
      icon: 'text-purple-600',
      border: 'border-purple-500',
      bg: 'bg-purple-100',
    },
  },
  {
    text: 'Get Tax Insight',
    icon: BrainCircuit,
    action: 'Insight',
    colors: {
        icon: 'text-yellow-600',
        border: 'border-yellow-500',
        bg: 'bg-yellow-100',
    }
  }
] as const;

export function ChatInterfaceSection() {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        setValue(value + finalTranscript + interimTranscript);
      };
    }
  }, [value]);

  const handleCustomAction = async (
    action: 'Summarize' | 'Proofread' | 'Condense' | 'Insight' | 'Send'
  ) => {
    if (!value && !file) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setActiveAction(action);

    try {
      if (file) {
        // Handle file-based action
        const reader = new FileReader();
        reader.onload = async (e) => {
          const documentDataUri = e.target?.result as string;
          const query = value || (action !== 'Send' ? `Please ${action} this document.` : 'Analyze this document.');
          const response = await analyzeDocumentAction({ documentDataUri, query });
          setResult(response.analysis);
        };
        reader.readAsDataURL(file);
      } else {
        // Handle text-based action
        let effectiveAction = action;
        if (action === 'Send') {
            // If there's a file, we assume the user wants to analyze it.
            // If not, we'll get tax insights based on the text.
            if (file) {
                 const reader = new FileReader();
                reader.onload = async (e) => {
                  const documentDataUri = e.target?.result as string;
                  const query = value || 'Analyze this document.';
                  const response = await analyzeDocumentAction({ documentDataUri, query });
                  setResult(response.analysis);
                };
                reader.readAsDataURL(file);
                return; // Return early to avoid running text-based logic
            } else {
                 effectiveAction = 'Insight';
            }
        }
        
        if (effectiveAction === 'Insight') {
            const response = await getPersonalizedInsightsAction({ financialData: value, financialNews: '' });
            setResult(response.insights);
        } else {
            const response = await processTextAction({ text: value, action: effectiveAction });
            setResult(response.processedText);
        }
      }
    } catch (err) {
      setError('An error occurred while processing your request.');
      console.error(err);
    } finally {
      setLoading(false);
      setActiveAction(null);
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
        setFile(selectedFile);
    }
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
    }
    setIsRecording(!isRecording);
  };


  return (
    <section className="flex justify-center">
      <div className="w-full max-w-4xl p-4">
        <form
          className="relative rounded-lg border bg-background p-1 focus-within:ring-1 focus-within:ring-ring"
          onSubmit={(e) => {
            e.preventDefault();
            handleCustomAction('Send');
          }}
        >
          <ChatInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type, paste, upload a file, or use your voice..."
            className="min-h-12 resize-none rounded-lg border-0 bg-background p-3 shadow-none focus-visible:ring-0"
          />
          {file && (
            <div className="p-3 pt-0">
                <Badge variant="secondary" className="flex items-center gap-2">
                    {file.name}
                    <button type="button" onClick={() => setFile(null)} className="focus:outline-none">
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            </div>
          )}
          <div className="flex flex-wrap items-center gap-2 p-3 pt-0">
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*,application/pdf"
            />
            <Button variant="ghost" size="icon" type="button" onClick={() => fileInputRef.current?.click()}>
              <Paperclip className="size-4" />
              <span className="sr-only">Attach file</span>
            </Button>

            {recognitionRef.current && (
                 <Button variant="ghost" size="icon" type="button" onClick={handleToggleRecording}>
                    {isRecording ? <MicOff className="size-4 text-red-500" /> : <Mic className="size-4" />}
                    <span className="sr-only">{isRecording ? 'Stop Recording' : 'Use Microphone'}</span>
                 </Button>
            )}
            
            <div className="flex items-center gap-2">
                {CUSTOM_ACTIONS.map((action) => (
                <Button
                    key={action.text}
                    variant="outline"
                    type="button"
                    disabled={(!value && !file) || loading}
                    className={cn(
                    'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all hover:shadow-lg',
                    action.colors.border,
                    action.colors.bg
                    )}
                    onClick={() => handleCustomAction(action.action)}
                >
                    {loading && activeAction === action.action ? (
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
              disabled={(!value && !file) || loading}
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

declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}
