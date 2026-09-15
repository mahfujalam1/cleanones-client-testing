import React from "react";
import { TOKENS } from "@/styles/tokens";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface IconBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary" | "neutral" | "sidebar";
  children: React.ReactNode;
}

export function IconBadge({ children, variant = "primary", className, ...props }: IconBadgeProps) {
  const variantStyles = {
    primary: "bg-primary-light text-primary border-primary/10",
    secondary: "bg-secondary text-secondary-foreground border-border",
    neutral: "bg-slate-50 text-slate-600 border-slate-200",
    sidebar: "bg-sidebar-hover text-sidebar-foreground border-sidebar-hover",
  };

  return (
    <div
      className={twMerge(
        clsx(
          TOKENS.iconBadgeBase,
          variantStyles[variant],
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
}
