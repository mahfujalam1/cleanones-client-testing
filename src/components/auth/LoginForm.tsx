"use client";

import React from "react";
import { Checkbox } from "antd";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function LoginForm({
  t,
  p,
  email,
  setEmail,
  password,
  setPassword,
  error,
  rememberMe,
  setRememberMe,
  loading,
  onSubmit,
  onForgotPassword,
}: {
  t: any;
  p: any;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  error: string;
  rememberMe: boolean;
  setRememberMe: (value: boolean) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onForgotPassword: () => void;
}) {
  return (
    <div className="w-full max-w-lg rounded-lg border border-slate-200 bg-white p-7 sm:p-9 shadow-sm relative z-10">
      <div className="flex flex-col items-center mb-9">
        <div className="mb-4 flex items-center justify-center">
          <img src="/cleanones.png" className="h-auto w-28 object-contain" alt="CleanOnes" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{t.welcome}</h2>
        <p className="text-sm text-slate-500 mt-1.5">{t.portalSubtitle}</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
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
            onClick={onForgotPassword}
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
  );
}
