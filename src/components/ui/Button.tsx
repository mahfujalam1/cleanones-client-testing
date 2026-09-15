"use client";

import React from "react";
import { Button as AntdButton, type ButtonProps as AntdButtonProps } from "antd";
import { TOKENS } from "@/styles/tokens";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends Omit<AntdButtonProps, "block" | "htmlType" | "size" | "type" | "variant"> {
  variant?: "primary" | "secondary" | "secondary-light" | "secondary-green" | "secondary-cyan" | "secondary-purple" | "secondary-red" | "outline" | "text";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  type = "button",
  className,
  ...props
}: ButtonProps) {
  const variantStyles = {
    primary: "!border-primary !bg-primary !text-primary-foreground hover:!border-primary-hover hover:!bg-primary-hover",
    secondary: "!border-border !bg-secondary !text-secondary-foreground hover:!bg-secondary-hover",
    "secondary-light": "!border-border !bg-secondary-light !text-secondary-foreground hover:!bg-muted",
    "secondary-green": "!border-[#00BC7D] !bg-[#00BC7D] !text-white",
    "secondary-cyan": "!border-[#00A6F4] !bg-[#00A6F4] !text-white",
    "secondary-purple": "!border-[#8E51FF] !bg-[#8E51FF] !text-white",
    "secondary-red": "!border-[#FF2056] !bg-[#FF2056] !text-white",
    outline: "!border-border !bg-white !text-foreground hover:!bg-muted/60",
    text: "!border-transparent !bg-transparent !text-muted-foreground hover:!bg-muted/60 hover:!text-foreground",
  };

  const sizeStyles = {
    sm: "!h-8 px-3 !text-xs",
    md: "!h-9 px-4 !text-sm",
    lg: "!h-10 px-5 !text-sm",
  };

  return (
    <AntdButton
      block={fullWidth}
      htmlType={type}
      type={variant === "primary" ? "primary" : variant === "text" ? "text" : "default"}
      className={twMerge(
        clsx(
          TOKENS.buttonBase,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )
      )}
      {...props}
    >
      {children}
    </AntdButton>
  );
}
