"use client";

import React, { useEffect, useState } from "react";
import { message } from "antd";
import { useRouter, useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loginSuccess, saveStoredUser } from "@/redux/slices/authSlice";
import { setActiveTab } from "@/redux/slices/uiSlice";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { AuthShell } from "@/components/auth/AuthShell";
import { Checkbox, Dropdown } from "antd";
import { useLoginMutation } from "@/redux/apis/auth";
import { setAuthCookies } from "@/redux/baseApi";
import { getAuthTranslation, getTranslation, getPlaceholderTranslation } from "@/utils/translations";
import { TbWorld } from "react-icons/tb";

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

  const languageItems = [
    { key: "en", label: "English", onClick: () => handleLanguageChange("en") },
    { key: "nl", label: "Nederlands", onClick: () => handleLanguageChange("nl") },
    { key: "pl", label: "Polski", onClick: () => handleLanguageChange("pl") },
    { key: "uk", label: "Українська", onClick: () => handleLanguageChange("uk") },
    { key: "pt", label: "Português", onClick: () => handleLanguageChange("pt") },
    { key: "ar", label: "العربية", onClick: () => handleLanguageChange("ar") },
    { key: "fr", label: "Français", onClick: () => handleLanguageChange("fr") },
    { key: "es", label: "Español", onClick: () => handleLanguageChange("es") },
  ];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [loginMutation, { isLoading: loading }] = useLoginMutation();

  // Redirect to dashboard if user is already authenticated
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

        // Save to localStorage or sessionStorage based on rememberMe
        saveStoredUser(user, rememberMe);
        setAuthCookies(accessToken, refreshToken, rememberMe);

        dispatch(loginSuccess(user));
        dispatch(setActiveTab("dashboard"));
        message.success(rootT.actionFeedback.loginSuccess);
        // router.push(`/${locale}`);
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
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <Dropdown menu={{ items: languageItems }} trigger={["click"]} placement="bottomRight">
          <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 shadow-sm">
            <TbWorld className="h-4 w-4" />
            <span className="uppercase">{locale}</span>
          </button>
        </Dropdown>
      </div>

      <div className="w-full max-w-lg rounded-lg border border-slate-200 bg-white p-7 sm:p-9 shadow-sm relative z-10">
        <div className="flex flex-col items-center mb-9">
          <div className="mb-4 flex items-center justify-center">
            <img src="/cleanones.png" className="h-auto w-28 object-contain" alt="CleanOnes" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{t.welcome}</h2>
          <p className="text-sm text-slate-500 mt-1.5">{t.portalSubtitle}</p>
        </div>

        <form onSubmit={handleSignIn} className="space-y-5">
          <Input
            className="!h-12 !text-[15px]"
            label={t.email}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            placeholder={p.email}
            error={error && !email ? t.emailRequired : ""}
            required
          />
          <Input
            className="!h-12 !text-[15px]"
            label={t.password}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={p.password}
            error={error && !password ? t.passwordRequired : ""}
            required
          />

          <div className="flex items-center justify-between text-sm select-none">
            <Checkbox checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} className="text-slate-600">{t.rememberMe}</Checkbox>
            <button
              type="button"
              onClick={() => router.push(`/${locale}/forgot-password`)}
              className="text-primary hover:underline font-medium cursor-pointer"
            >
              {t.forgotPassword}
            </button>
          </div>

          {error && <div className="text-sm text-red-500 text-center font-medium">{error}</div>}

          <div className="pt-2">
            <Button type="submit" variant="primary" size="lg" className="!h-12 !text-[15px]" fullWidth disabled={loading}>
              {loading ? t.signingIn : t.signIn}
            </Button>
          </div>
        </form>
      </div>
    </AuthShell>
  );
}
