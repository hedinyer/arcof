import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          {
            default:
              "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]",
            outline:
              "border border-[var(--text-secondary)]/30 bg-transparent hover:bg-[var(--background-elevated)]",
            secondary:
              "bg-[var(--background-elevated)] text-[var(--text-primary)] hover:bg-[var(--text-secondary)]/15",
            ghost: "hover:bg-[var(--background-elevated)]",
            link: "text-[var(--accent)] underline-offset-4 hover:underline",
          }[variant],
          {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10",
          }[size]
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
