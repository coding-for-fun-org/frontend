import clsx from 'clsx'
import { type TextareaHTMLAttributes, forwardRef } from 'react'

type TTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

const TextareaRoot = forwardRef<HTMLTextAreaElement, TTextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={clsx(
          'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    )
  }
)
TextareaRoot.displayName = 'Textarea'

export const Textarea = ({ ...props }: TTextareaProps) => (
  <TextareaRoot {...props} />
)
Textarea.displayName = TextareaRoot.displayName
