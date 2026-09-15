import React from "react";
import { TOKENS } from "@/styles/tokens";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "neutral";
  children: React.ReactNode;
}

export function Badge({ children, variant = "primary", className, ...props }: BadgeProps) {
  const variantStyles = {
    primary: "bg-primary-light text-primary border border-primary/20",
    secondary: "bg-secondary text-secondary-foreground border border-border",
    neutral: "bg-slate-100 text-slate-600 border border-slate-200",
  };

  return (
    <span
      className={twMerge(
        clsx(
          TOKENS.badgeBase,
          variantStyles[variant],
          "rounded",
          className
        )
      )}
      {...props}
    >
      {children}
    </span>
  );
}
