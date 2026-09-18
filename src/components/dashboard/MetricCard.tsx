import type { ReactNode } from "react";
import { TbArrowUpRight } from "react-icons/tb";

export type MetricPillColor = "indigo" | "sky" | "violet" | "slate" | "emerald" | "teal" | "blue";

interface MetricCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  subValue?: string;
  pillText?: string;
  pillColor?: MetricPillColor;
  footerText: string;
  progressPercent?: number;
  progressBarColor?: string;
  onClick?: () => void;
}

const colorStyles: Record<
  MetricPillColor,
  { pill: string; iconBg: string; dot: string; hoverBorder: string }
> = {
  indigo: {
    pill: "bg-indigo-50 text-indigo-700 border-indigo-200/70",
    iconBg: "bg-indigo-50 text-indigo-600 ring-indigo-100",
    dot: "bg-indigo-500",
    hoverBorder: "hover:border-indigo-300",
  },
  sky: {
    pill: "bg-sky-50 text-sky-700 border-sky-200/70",
    iconBg: "bg-sky-50 text-sky-600 ring-sky-100",
    dot: "bg-sky-500",
    hoverBorder: "hover:border-sky-300",
  },
  violet: {
    pill: "bg-violet-50 text-violet-700 border-violet-200/70",
    iconBg: "bg-violet-50 text-violet-600 ring-violet-100",
    dot: "bg-violet-500",
    hoverBorder: "hover:border-violet-300",
  },
  slate: {
    pill: "bg-slate-100 text-slate-700 border-slate-200",
    iconBg: "bg-slate-100 text-slate-600 ring-slate-200/80",
    dot: "bg-slate-500",
    hoverBorder: "hover:border-slate-300",
  },
  emerald: {
    pill: "bg-emerald-50 text-emerald-700 border-emerald-200/70",
    iconBg: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    dot: "bg-emerald-500",
    hoverBorder: "hover:border-emerald-300",
  },
  teal: {
    pill: "bg-teal-50 text-teal-700 border-teal-200/70",
    iconBg: "bg-teal-50 text-teal-600 ring-teal-100",
    dot: "bg-teal-500",
    hoverBorder: "hover:border-teal-300",
  },
  blue: {
    pill: "bg-blue-50 text-blue-700 border-blue-200/70",
    iconBg: "bg-blue-50 text-blue-600 ring-blue-100",
    dot: "bg-blue-500",
    hoverBorder: "hover:border-blue-300",
  },
};

export const MetricCard = ({
  icon,
  label,
  value,
  subValue,
  pillText,
  pillColor = "sky",
  footerText,
  progressPercent,
  progressBarColor = "#10b981",
  onClick,
}: MetricCardProps) => {
  const theme = colorStyles[pillColor] || colorStyles.sky;

  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200/80 bg-white p-3.5 sm:p-4 shadow-xs transition-all duration-200 ${onClick ? `cursor-pointer hover:-translate-y-0.5 hover:shadow-md ${theme.hoverBorder}` : "cursor-default"
        }`}
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          {pillText ? (
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wide ${theme.pill}`}
            >
              {pillText}
            </span>
          ) : (
            <span />
          )}
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-base shadow-inner ring-1 transition-transform duration-200 group-hover:scale-105 ${theme.iconBg}`}
          >
            {icon}
          </span>
        </div>

        <div className="mt-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 transition-colors group-hover:text-slate-600">
            {label}
          </p>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-800">
              {value}
            </span>
            {subValue && (
              <span className="text-xs font-semibold text-slate-400">
                {subValue}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 border-t border-slate-100 pt-2.5">
        {typeof progressPercent === "number" && (
          <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${Math.min(100, Math.max(0, progressPercent))}%`,
                backgroundColor: progressBarColor,
              }}
            />
          </div>
        )}
        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5 truncate">
            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${theme.dot}`} />
            <span className="truncate">{footerText}</span>
          </div>
          {onClick && (
            <TbArrowUpRight className="shrink-0 text-slate-400 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:text-slate-600 group-hover:translate-x-0.5" />
          )}
        </div>
      </div>
    </div>
  );
};
