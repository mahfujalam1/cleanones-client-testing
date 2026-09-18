"use client";

import React, { useState } from "react";
import { message } from "antd";
import { useRouter, useParams } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
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
      <ForgotPasswordForm
        t={t}
        p={p}
        email={email}
        setEmail={setEmail}
        error={error}
        loading={loading}
        onSubmit={handleSubmit}
        onSignIn={() => router.push(`/${locale}/login`)}
      />
    </AuthShell>
  );
}
