"use client";

import React from "react";
import { LoginVisualPanel } from "@/components/auth/LoginVisualPanel";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen bg-[#f7f8fa]">
      <LoginVisualPanel />
      <section className="flex w-full items-center justify-center px-4 py-8 sm:px-6 lg:w-1/2 lg:px-10">
        {children}
      </section>
    </main>
  );
}
