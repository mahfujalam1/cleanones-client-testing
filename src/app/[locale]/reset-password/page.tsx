"use client";

import React, { useState } from "react";
import { message } from "antd";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AuthShell } from "@/components/auth/AuthShell";
import { useResetPasswordMutation } from "@/redux/apis/auth";
import { getAuthTranslation, getTranslation, getPlaceholderTranslation } from "@/utils/translations";

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const locale = (params?.locale as string) || "en";
  const t = getAuthTranslation(locale);
  const rootT = getTranslation(locale);
  const p = getPlaceholderTranslation(locale);

  const [resetPasswordMutation, { isLoading: loading }] = useResetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    if (!password || !confirmPassword) {
      setError(`${t.newPassword} / ${t.confirmPassword}`);
      return;
    }

    if (password !== confirmPassword) {
      message.error(t.passwordMismatch);
      return;
    }

    if (password.length < 6) {
      message.error(t.passwordLength);
      return;
    }

    const email = sessionStorage.getItem("cleanones-reset-email");
    if (!email) {
      setError(t.sessionExpired);
      return;
    }

    try {
      const result = await resetPasswordMutation({
        email,
        password,
        confirmPassword,
      }).unwrap();

      if (result.success) {
        setSuccessMsg(result.message || t.resetSuccess);
        sessionStorage.removeItem("cleanones-reset-email");
        sessionStorage.removeItem("cleanones-reset-otp");

        setTimeout(() => {
          router.push(`/${locale}/login`);
        }, 1500);
      } else {
        message.error(result.message || rootT.actionFeedback.error);
      }
    } catch (err: unknown) {
      const errObj = err as { data?: { message?: string }; message?: string };
      setError(errObj?.data?.message || errObj?.message || "Failed to reset password");
    }
  };

  return (
    <AuthShell>
      <Card className="w-full max-w-md space-y-4 rounded border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex flex-col items-center select-none">
          <div className="mb-4 flex items-center justify-center">
            <img src="/cleanones.png" className="h-auto w-24 object-contain" alt="CleanOnes" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">{t.setPasswordTitle}</h2>
          <p className="text-xs text-slate-500 text-center mt-1">
            {t.setPasswordDescription}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label={t.newPassword}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={p.password}
            required
          />
          <Input
            label={t.confirmPassword}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder={p.password}
            required
          />

          {error && <div className="text-xs text-red-500 font-medium text-center">{error}</div>}
          {successMsg && <div className="text-xs text-emerald-600 font-medium text-center">{successMsg}</div>}

          <Button type="submit" variant="primary" fullWidth className="pt-2" disabled={loading}>
            {loading ? t.resetting : t.resetPassword}
          </Button>
        </form>
      </Card>
    </AuthShell>
  );
}
