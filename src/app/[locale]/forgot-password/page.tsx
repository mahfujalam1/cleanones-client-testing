"use client";

import React, { useState } from "react";
import { message } from "antd";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AuthShell } from "@/components/auth/AuthShell";
import { useForgetPasswordMutation } from "@/redux/apis/auth";
import { getAuthTranslation, getTranslation, getPlaceholderTranslation } from "@/utils/translations";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const locale = (params?.locale as string) || "en";
  const t = getAuthTranslation(locale);
  const rootT = getTranslation(locale);
  const p = getPlaceholderTranslation(locale);

  const [forgetPasswordMutation, { isLoading: loading }] = useForgetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError(t.emailRequired);
      return;
    }
    setError("");

    try {
      const result = await forgetPasswordMutation({ email }).unwrap();
      if (result.success) {
        sessionStorage.setItem("cleanones-reset-email", email);
        router.push(`/${locale}/verify-otp`);
      } else {
        message.error(result.message || rootT.actionFeedback.error);
      }
    } catch (err: unknown) {
      const errObj = err as { data?: { message?: string }; message?: string };
      setError(errObj?.data?.message || errObj?.message || "Failed to send reset code");
    }
  };

  return (
    <AuthShell>
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

        <form onSubmit={handleSubmit} className="space-y-4">
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
            onClick={() => router.push(`/${locale}/login`)}
            className="text-primary hover:underline cursor-pointer font-semibold"
          >
            {t.signIn}
          </span>
        </p>
      </Card>
    </AuthShell>
  );
}
