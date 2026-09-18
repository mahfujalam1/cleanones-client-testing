export function formatHours(hours: number = 0): string {
  if (!hours || isNaN(hours) || hours <= 0) return "0h";
  const whole = Math.floor(hours);
  const mins = Math.round((hours - whole) * 60);
  if (whole > 0 && mins > 0) return `${whole}h ${mins}m`;
  if (whole > 0) return `${whole}h`;
  return `${mins}m`;
}

export function formatShiftTime(isoString?: string | null): string {
  if (!isoString) return "—";
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function formatDateRange(fromStr?: string, toStr?: string, locale = "en"): string {
  if (!fromStr || !toStr) return "";
  const from = new Date(fromStr);
  const to = new Date(toStr);
  if (isNaN(from.getTime()) || isNaN(to.getTime())) return "";
  const f = from.toLocaleDateString(locale, { month: "short", day: "numeric" });
  const t = to.toLocaleDateString(locale, { month: "short", day: "numeric", year: "numeric" });
  return `${f} – ${t}`;
}

export function getStatusBadge(status: string, t: any) {
  switch (status) {
    case "active":
      return {
        label: "Cleaning In Progress",
        cls: "bg-emerald-100 text-emerald-800 border-emerald-300",
        dot: "bg-emerald-500 animate-pulse",
        sub: "Specialists are currently servicing your site.",
      };
    case "scheduled":
      return {
        label: "Scheduled Today",
        cls: "bg-sky-100 text-sky-800 border-sky-300",
        dot: "bg-sky-500",
        sub: "Cleaning shifts are queued for service today.",
      };
    case "completed":
      return {
        label: "Service Completed",
        cls: "bg-indigo-100 text-indigo-800 border-indigo-300",
        dot: "bg-indigo-500",
        sub: "All designated service shifts for today have finished.",
      };
    case "no_service":
    default:
      return {
        label: t.dashboard.noServiceToday || "No Service Today",
        cls: "bg-slate-100 text-slate-700 border-slate-300",
        dot: "bg-slate-400",
        sub: "No cleaning shifts scheduled for today.",
      };
  }
}
