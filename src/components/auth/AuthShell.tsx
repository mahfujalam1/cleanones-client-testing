"use client";

import React from "react";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center bg-[#f7f8fa] px-4 py-8 sm:px-6 lg:px-10">
      {children}
    </main>
  );
}
