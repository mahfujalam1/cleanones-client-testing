"use client";

import React from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function ResetPasswordForm({
  t,
  p,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  error,
  successMsg,
  loading,
  onSubmit,
}: {
  t: any;
  p: any;
  password: string;
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  error: string;
  successMsg: string;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
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

      <form onSubmit={onSubmit} className="space-y-4">
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
  );
}
