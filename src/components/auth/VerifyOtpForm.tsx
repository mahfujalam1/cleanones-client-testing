"use client";

import React from "react";
import { Input as AntInput } from "antd";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function VerifyOtpForm({
  t,
  email,
  otp,
  onOtpChange,
  error,
  info,
  verifying,
  resending,
  onSubmit,
  onResend,
}: {
  t: any;
  email: string;
  otp: string;
  onOtpChange: (value: string) => void;
  error: string;
  info: string;
  verifying: boolean;
  resending: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onResend: () => void;
}) {
  return (
    <Card className="w-full max-w-md space-y-4 rounded border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex flex-col items-center select-none">
        <div className="mb-4 flex items-center justify-center">
          <img src="/cleanones.png" className="h-auto w-24 object-contain" alt="CleanOnes" />
        </div>
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">{t.otpTitle}</h2>
        <p className="text-xs text-slate-500 text-center mt-1">
          {t.otpDescription} {email ? <span className="font-semibold text-slate-700">{email}</span> : t.emailFallback}. Paste or type the 6-digit code below.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="flex justify-center">
          <AntInput.OTP length={6} value={otp} onChange={onOtpChange} formatter={(value) => value.replace(/\D/g, "")} size="middle" />
        </div>

        {error && <div className="text-xs text-red-500 font-medium text-center">{error}</div>}
        {info && <div className="text-xs text-emerald-600 font-medium text-center">{info}</div>}

        <Button type="submit" variant="primary" fullWidth loading={verifying} className="pt-2">
          {t.verifyCode}
        </Button>
      </form>

      <p className="text-[11px] text-slate-400 text-center">
        Didn&apos;t receive the code?{" "}
        <button
          type="button"
          onClick={onResend}
          disabled={resending}
          className="text-primary hover:underline cursor-pointer font-semibold disabled:opacity-60 bg-transparent border-none p-0"
        >
          {resending ? t.sending : t.resendCode}
        </button>
      </p>
    </Card>
  );
}
