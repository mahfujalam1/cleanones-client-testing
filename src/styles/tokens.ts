/**
 * Shared Tailwind utility class name constants.
 * Visual-only tokens aligned with the CleanOnes reference design system.
 */
export const TOKENS = {
  // Cards: white surface, subtle border, tight radius (reference dashboard-card)
  cardBase:
    "bg-card text-card-foreground border border-border rounded p-4 shadow-none",

  iconBadgeBase:
    "flex items-center justify-center rounded-md w-9 h-9 border border-border bg-muted text-primary",

  // Inputs match reference Field CONTROL_CLASS (h-10, text-sm, rounded-lg feel via md radius)
  inputBase:
    "w-full h-10 px-3 border border-border bg-white rounded-md text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors duration-150 placeholder:text-muted-foreground",

  // Labels / captions
  badgeBase:
    "inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-medium tracking-wide",

  // Buttons — medium uses text-sm like reference Button sizes
  buttonBase:
    "inline-flex items-center justify-center font-medium rounded-md transition-colors duration-150 ease-out text-sm cursor-pointer focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
};
