"use client";

import { Dropdown } from "antd";
import { TbWorld } from "react-icons/tb";

const LANGUAGES = [
  { key: "en", label: "English" },
  { key: "nl", label: "Nederlands" },
  { key: "pl", label: "Polski" },
  { key: "uk", label: "Українська" },
  { key: "pt", label: "Português" },
  { key: "ar", label: "العربية" },
  { key: "fr", label: "Français" },
  { key: "es", label: "Español" },
];

export function LoginLanguageSwitcher({ locale, onChange }: { locale: string; onChange: (locale: string) => void }) {
  const languageItems = LANGUAGES.map((lang) => ({
    key: lang.key,
    label: lang.label,
    onClick: () => onChange(lang.key),
  }));

  return (
    <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
      <Dropdown menu={{ items: languageItems }} trigger={["click"]} placement="bottomRight">
        <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 shadow-sm">
          <TbWorld className="h-4 w-4" />
          <span className="uppercase">{locale}</span>
        </button>
      </Dropdown>
    </div>
  );
}
