import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "bg-background-tertiary text-foreground border-border placeholder:text-foreground-tertiary flex h-8 w-full rounded-[4px] border px-3 py-1 text-sm shadow-input-inner",
          "focus-visible:border-blue-border focus-visible:ring-2 focus-visible:ring-blue-border/50",
          "aria-[invalid=true]:border-red aria-[invalid=true]:ring-red/20",
          "hover:border-border-secondary",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:text-foreground-inactive",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
