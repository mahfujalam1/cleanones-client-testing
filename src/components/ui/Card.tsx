import React from "react";
import { TOKENS } from "@/styles/tokens";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={twMerge(clsx(TOKENS.cardBase, className))}
      {...props}
    >
      {children}
    </div>
  );
}
