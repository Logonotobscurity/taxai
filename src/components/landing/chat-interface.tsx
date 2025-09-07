
"use client"

import { useState } from "react"
import { ChatInput } from "@/components/ui/chat-input"
import { Button } from "@/components/ui/button"
import { Paperclip, Mic, CornerDownLeft, Text, CheckCheck, ArrowDownWideNarrow } from "lucide-react"
import { cn } from "@/lib/utils"

const CUSTOM_ACTIONS = [
    {
      text: "Summarize",
      icon: Text,
      colors: {
        icon: "text-blue-600",
        border: "border-blue-500",
        bg: "bg-blue-100",
      },
    },
    {
      text: "Proofread",
      icon: CheckCheck,
      colors: {
        icon: "text-green-600",
        border: "border-green-500",
        bg: "bg-green-100",
      },
    },
    {
      text: "Condense",
      icon: ArrowDownWideNarrow,
      colors: {
        icon: "text-purple-600",
        border: "border-purple-500",
        bg: "bg-purple-100",
      },
    },
  ];

export function ChatInterfaceSection() {
  const [value, setValue] = useState("")

  return (
    <section className="py-16 md:py-24 flex justify-center">
        <div className="max-w-4xl w-full p-4">
        <div className="flex justify-center gap-4 mb-4">
            {CUSTOM_ACTIONS.map((action) => (
              <Button
                key={action.text}
                variant="outline"
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all hover:shadow-lg",
                  action.colors.border,
                  action.colors.bg
                )}
                onClick={() => console.log(`${action.text} clicked`)}
              >
                <action.icon className={cn("size-4", action.colors.icon)} />
                <span className={action.colors.icon}>{action.text}</span>
              </Button>
            ))}
          </div>
        <form 
            className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1"
            onSubmit={(e) => {
            e.preventDefault()
            console.log("Submitted:", value)
            setValue(''); // Clear input after submission
            }}
        >
            <ChatInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type your message here..."
            className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
            />
            <div className="flex items-center p-3 pt-0">
            <Button variant="ghost" size="icon" type="button">
                <Paperclip className="size-4" />
                <span className="sr-only">Attach file</span>
            </Button>

            <Button variant="ghost" size="icon" type="button">
                <Mic className="size-4" />
                <span className="sr-only">Use Microphone</span>
            </Button>

            <Button
                type="submit"
                size="sm"
                className="ml-auto gap-1.5"
                disabled={!value}
            >
                Send Message
                <CornerDownLeft className="size-3.5" />
            </Button>
            </div>
        </form>
        </div>
    </section>
  )
}
