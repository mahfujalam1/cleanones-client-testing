"use client";

import React, { forwardRef } from "react";
import { Input as AntdInput, type InputProps as AntdInputProps, type InputRef } from "antd";
import { TOKENS } from "@/styles/tokens";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TbEye, TbEyeOff } from "react-icons/tb";

interface InputProps extends Omit<AntdInputProps, "status"> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<InputRef, InputProps>(
  ({ label, error, className, type = "text", ...props }, ref) => {
    const Component = type === "password" ? AntdInput.Password : AntdInput;
    const passwordProps = type === "password" ? {
      iconRender: (visible: boolean) =>
        visible ? (
          <TbEye className="text-lg text-slate-400 hover:text-slate-600 cursor-pointer" />
        ) : (
          <TbEyeOff className="text-lg text-slate-400 hover:text-slate-600 cursor-pointer" />
        ),
    } : {};

    return (
      <div className="w-full">
        {label && (
          <label className="mb-1.5 block text-xs font-semibold text-slate-700">
            {label}
          </label>
        )}
        <Component
          type={type}
          ref={ref as any}
          status={error ? "error" : undefined}
          className={twMerge(
            clsx(
              TOKENS.inputBase,
              error && "border-red-500 focus:border-red-500",
              className
            )
          )}
          {...passwordProps}
          {...props}
        />
        {error && (
          <span className="block text-xs text-red-500 mt-1 font-medium">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
