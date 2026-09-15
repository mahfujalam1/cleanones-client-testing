"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { MdCheck, MdLockOutline, MdOutlineAutoAwesome } from "react-icons/md";
import { useParams } from "next/navigation";
import { getAuthTranslation } from "@/utils/translations";

export function LoginVisualPanel() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const t = getAuthTranslation(locale);
  const vp = t.visualPanel!;

  return (
    <aside className="relative hidden w-1/2 overflow-hidden border-r border-white/10 bg-[#111827] p-10 text-slate-300 lg:flex lg:flex-col lg:justify-between">
      <div className="pointer-events-none absolute -right-36 top-24 h-72 w-72 rounded-full border border-white/60" />
      <div className="pointer-events-none absolute -right-20 top-40 h-48 w-48 rounded-full border border-white/60" />

      <div className="relative z-10">
        <img src="/cleanones.png" className="h-auto w-32 object-contain" alt="CleanOnes" />
      </div>

      <div className="relative z-10 my-auto max-w-md space-y-6">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/70 px-3 py-1.5 text-[11px] font-medium text-white">
            <MdOutlineAutoAwesome className="text-primary" /> {vp.badge}
          </span>
          <h1 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-white xl:text-4xl">
            {vp.title}
          </h1>
        </div>

        <ul className="space-y-3 text-sm text-white">
          {[vp.bullet1, vp.bullet2, vp.bullet3].map((item) => (
            <li key={item} className="flex items-center gap-3">
              <MdCheck className="h-4 w-4 rounded-full border border-primary p-0.5 text-primary" />
              {item}
            </li>
          ))}
        </ul>

        <Card className="max-w-md rounded border-0 bg-white/5 p-4 text-white shadow-none">
          <div className="mb-3 flex items-center justify-between text-xs">
            <span className="font-semibold">{vp.cardTitle}</span>
            <span className="flex items-center gap-1.5 font-medium text-primary">
              {vp.cardStatus}
            </span>
          </div>
          <div className="mb-2 flex justify-between text-xs">
            <span>{vp.cardLocation}</span>
            <span className="font-semibold">{vp.cardTime}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/15">
            <div className="h-full w-full rounded-full bg-primary" />
          </div>
        </Card>
      </div>

      <div className="relative z-10 flex items-center gap-2 text-[10px] text-slate-400">
        <MdLockOutline className="h-3.5 w-3.5" />
        <span>{vp.footer}</span>
      </div>
    </aside>
  );
}
