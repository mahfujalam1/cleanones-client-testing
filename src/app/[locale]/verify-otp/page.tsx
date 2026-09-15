"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AuthShell } from "@/components/auth/AuthShell";
import { useVerifyResetOtpMutation, useForgetPasswordMutation } from "@/redux/apis/auth";
import { Input as AntInput } from "antd";
import { getAuthTranslation, getTranslation } from "@/utils/translations";
import { message } from "antd";

export default function VerifyOtpPage() {
  const router = useRouter();
  const params = useParams();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [email] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("cleanones-reset-email") || "";
    }
    return "";
  });

  const locale = (params?.locale as string) || "en";
  const t = getAuthTranslation(locale);
  const rootT = getTranslation(locale);

  const [verifyOtpMutation, { isLoading: verifying }] = useVerifyResetOtpMutation();
  const [forgetPasswordMutation, { isLoading: resending }] = useForgetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) {
      setError(t.completeOtp);
      return;
    }
    const targetEmail = email || sessionStorage.getItem("cleanones-reset-email") || "";
    if (!targetEmail) {
      setError(t.restartReset);
      return;
    }

    try {
      const result = await verifyOtpMutation({
        email: targetEmail,
        resetCode: Number(otp),
      }).unwrap();

      if (result.success) {
        sessionStorage.setItem("cleanones-reset-otp", otp);
        router.push(`/${locale}/reset-password`);
      } else {
        setError(result.message || "Invalid or expired OTP code");
      }
    } catch (err: unknown) {
      const errObj = err as { data?: { message?: string }; message?: string };
      setError(errObj?.data?.message || errObj?.message || "Invalid or expired OTP code");
    }
  };

  const handleResend = async () => {
    const targetEmail = email || sessionStorage.getItem("cleanones-reset-email");
    if (!targetEmail) {
      setError(t.restartReset);
      return;
    }
    setError("");
    setInfo("");

    try {
      const result = await forgetPasswordMutation({ email: targetEmail }).unwrap();
      if (result.success) {
        setInfo(result.message || t.otpSent);
      } else {
        message.error(result.message || rootT.actionFeedback.error);
      }
    } catch (err: unknown) {
      const errObj = err as { data?: { message?: string }; message?: string };
      setError(errObj?.data?.message || errObj?.message || "Failed to resend code");
    }
  };

  return (
    <AuthShell>
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center">
            <AntInput.OTP length={6} value={otp} onChange={(value) => { setOtp(value); setError(""); setInfo(""); }} formatter={(value) => value.replace(/\D/g, "")} size="middle" />
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
            onClick={handleResend}
            disabled={resending}
            className="text-primary hover:underline cursor-pointer font-semibold disabled:opacity-60 bg-transparent border-none p-0"
          >
            {resending ? t.sending : t.resendCode}
          </button>
        </p>
      </Card>
    </AuthShell>
  );
}
