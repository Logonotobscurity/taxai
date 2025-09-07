
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ChatInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const ChatInput = React.forwardRef<HTMLTextAreaElement, ChatInputProps>(
  ({ className, ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)

    React.useImperativeHandle(ref, () => textareaRef.current as HTMLTextAreaElement)

    React.useLayoutEffect(() => {
      const textarea = textareaRef.current
      if (textarea) {
        // Temporarily shrink to get the correct scrollHeight
        textarea.style.height = 'auto' 
        // Set the new height.
        textarea.style.height = `${textarea.scrollHeight}px`
      }
    }, [props.value]) // Recalculate on value change

    return (
      <textarea
        ref={textareaRef}
        className={cn(
          "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden",
          className
        )}
        rows={3} // Start with three rows
        {...props}
      />
    )
  }
)
ChatInput.displayName = "ChatInput"

export { ChatInput }
