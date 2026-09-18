import React from "react";

export function LiveStatusPageShell({ children, t }: { children: React.ReactNode; t: any }) {
  return (
    <div className="space-y-4 text-xs text-slate-700">
      <div>
        <h1 className="text-base font-bold text-slate-900">{t.titles.rooms}</h1>
        <p className="mt-1 text-xs text-slate-500">{t.rooms.liveSubtitle}</p>
      </div>
      {children}
    </div>
  );
}
