import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[4px] text-sm font-normal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-border disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0px_0.5px_1px_#000000,inset_0px_29px_23px_-16px_rgba(255,255,255,0.04),inset_0px_0.5px_0.5px_rgba(255,255,255,0.2)] hover:bg-primary-hover",
        destructive:
          "bg-red text-red-foreground shadow-[0px_0.5px_1px_#000000,inset_0px_29px_23px_-16px_rgba(255,255,255,0.04),inset_0px_0.5px_0.5px_rgba(255,255,255,0.2)] hover:bg-red-hover",
        outline:
          "border border-border bg-transparent text-foreground shadow-action-secondary hover:bg-background-secondary hover:text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-action-secondary hover:bg-secondary-hover",
        ghost: "hover:bg-background-tertiary hover:text-foreground",
        link: "text-blue-text underline-offset-4 hover:underline",
      },
      size: {
        default: "h-8 px-4 py-[4px]",
        sm: "h-6 px-3 py-[4px]",
        lg: "h-10 px-6",
        icon: "h-8 w-8 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
