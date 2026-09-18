"use client";

import React from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function ForgotPasswordForm({
  t,
  p,
  email,
  setEmail,
  error,
  loading,
  onSubmit,
  onSignIn,
}: {
  t: any;
  p: any;
  email: string;
  setEmail: (value: string) => void;
  error: string;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onSignIn: () => void;
}) {
  return (
    <Card className="w-full max-w-md space-y-4 rounded border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex flex-col items-center select-none">
        <div className="mb-4 flex items-center justify-center">
          <img src="/cleanones.png" className="h-auto w-24 object-contain" alt="CleanOnes" />
        </div>
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">{t.forgotTitle}</h2>
        <p className="text-xs text-slate-500 text-center mt-1">
          {t.forgotDescription}
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          label={t.email}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
          placeholder={p.email}
          error={error}
          required
        />

        <Button type="submit" variant="primary" fullWidth className="pt-2" disabled={loading}>
          {loading ? t.sending : t.sendOtp}
        </Button>
      </form>

      <p className="text-[11px] text-slate-400 text-center">
        {t.rememberQuestion}{" "}
        <span
          onClick={onSignIn}
          className="text-primary hover:underline cursor-pointer font-semibold"
        >
          {t.signIn}
        </span>
      </p>
    </Card>
  );
}
