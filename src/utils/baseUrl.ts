export const targetApi = (
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  process.env.API_BASE_URL ??
  ""
).replace(/\/$/, "");

/** Origin used for Socket.IO (no /api/v1 path). */
export const apiHost = (() => {
  if (!targetApi) return "";
  try {
    return new URL(targetApi).origin;
  } catch {
    return targetApi.replace(/\/api\/v1\/?$/, "").replace(/\/$/, "");
  }
})();

export const imgUrl = (url: string | null | undefined) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${targetApi}${url.startsWith("/") ? "" : "/"}${url}`;
};

/**
 * Base URL for API calls.
 *
 * When running in the browser over HTTPS while targetApi is HTTP (e.g. Vercel deployment),
 * route requests through Next.js rewrite proxy (/api/proxy) to prevent Mixed Content blocking.
 * Otherwise, call targetApi directly so developers can see the actual API URL in network calls.
 */
export const apiBase = () => {
  if (typeof window !== "undefined" && window.location.protocol === "https:" && targetApi.startsWith("http:")) {
    return "/api/proxy";
  }
  return targetApi || "/api/proxy";
};
