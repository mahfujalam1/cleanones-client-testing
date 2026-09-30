/** Round minutes up to the next 30-minute step. 29 → 30, 31 → 60. */
export function roundUpToHalfHourMinutes(minutes: number): number {
  if (!minutes || minutes <= 0) return 0;
  return Math.ceil(minutes / 30) * 30;
}

/** Round a duration up to the next 30-minute step, then format it. */
export function formatDurationMinutes(minutes: number): string {
  if (!minutes || minutes <= 0) return "0h";

  const rounded = roundUpToHalfHourMinutes(minutes);
  const wholeHours = Math.floor(rounded / 60);
  const remainder = rounded % 60;

  if (wholeHours > 0 && remainder > 0) return `${wholeHours}h ${remainder}m`;
  if (wholeHours > 0) return `${wholeHours}h`;
  return `${remainder}m`;
}

/** Same 30-minute round-up for a duration already stored in hours. */
export function formatDurationHours(hours: number): string {
  if (!hours || hours <= 0) return "0h";
  return formatDurationMinutes(Math.round(hours * 60));
}
