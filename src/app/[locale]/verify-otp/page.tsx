"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { VerifyOtpForm } from "@/components/auth/VerifyOtpForm";
import { useVerifyResetOtpMutation, useForgetPasswordMutation } from "@/redux/apis/auth";
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

  const handleOtpChange = (value: string) => {
    setOtp(value);
    setError("");
    setInfo("");
  };

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
      <VerifyOtpForm
        t={t}
        email={email}
        otp={otp}
        onOtpChange={handleOtpChange}
        error={error}
        info={info}
        verifying={verifying}
        resending={resending}
        onSubmit={handleSubmit}
        onResend={handleResend}
      />
    </AuthShell>
  );
}
