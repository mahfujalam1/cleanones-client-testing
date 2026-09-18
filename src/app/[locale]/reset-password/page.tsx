"use client";

import React, { useState } from "react";
import { message } from "antd";
import { useRouter, useParams } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
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
      <ResetPasswordForm
        t={t}
        p={p}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        error={error}
        successMsg={successMsg}
        loading={loading}
        onSubmit={handleSubmit}
      />
    </AuthShell>
  );
}
