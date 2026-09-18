"use client";

import React, { useEffect, useState } from "react";
import { message } from "antd";
import { useRouter, useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loginSuccess, saveStoredUser } from "@/redux/slices/authSlice";
import { setActiveTab } from "@/redux/slices/uiSlice";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginLanguageSwitcher } from "@/components/auth/LoginLanguageSwitcher";
import { LoginForm } from "@/components/auth/LoginForm";
import { useLoginMutation } from "@/redux/apis/auth";
import { setAuthCookies } from "@/redux/baseApi";
import { getAuthTranslation, getTranslation, getPlaceholderTranslation } from "@/utils/translations";

export default function LoginPage() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const initialized = useAppSelector((state) => state.auth.initialized);

  const locale = (params?.locale as string) || "en";
  const t = getAuthTranslation(locale);
  const rootT = getTranslation(locale);
  const p = getPlaceholderTranslation(locale);

  const handleLanguageChange = (newLocale: string) => {
    router.push(`/${newLocale}/login`);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [loginMutation, { isLoading: loading }] = useLoginMutation();


  useEffect(() => {
    if (initialized && isAuthenticated) {
      router.replace(`/${locale}`);
    }
  }, [initialized, isAuthenticated, router, locale]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError(`${t.emailRequired} / ${t.passwordRequired}`);
      return;
    }
    setError("");

    try {
      const result = await loginMutation({
        email,
        password,
        role: "client",
        platform: "web",
      }).unwrap();

      if (result.success && result.data) {
        const accessToken = result.data.accessToken;
        const refreshToken = result.data.refreshToken;
        const user = {
          name: email.split("@")[0],
          company: "",
          email: email,
          clientNo: "",
          phone: "",
          memberSince: "",
          contractType: "",
          status: "Active",
          role: result.data.role,
          access_token: accessToken,
          token: accessToken,
          refreshToken: refreshToken,
        };


        saveStoredUser(user, rememberMe);
        setAuthCookies(accessToken, refreshToken, rememberMe);

        dispatch(loginSuccess(user));
        dispatch(setActiveTab("dashboard"));
        message.success(rootT.actionFeedback.loginSuccess);

        window.location.href = `/${locale}`;
      } else {
        message.error(result.message || rootT.actionFeedback.loginFailed);
      }
    } catch (err: unknown) {
      const errObj = err as { data?: { message?: string }; message?: string };
      setError(errObj?.data?.message || errObj?.message || "Invalid email or password");
    }
  };

  return (
    <AuthShell>
      <LoginLanguageSwitcher locale={locale} onChange={handleLanguageChange} />

      <LoginForm
        t={t}
        p={p}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        error={error}
        rememberMe={rememberMe}
        setRememberMe={setRememberMe}
        loading={loading}
        onSubmit={handleSignIn}
        onForgotPassword={() => router.push(`/${locale}/forgot-password`)}
      />
    </AuthShell>
  );
}
