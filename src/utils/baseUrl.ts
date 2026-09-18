export const targetApi = (
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  process.env.API_BASE_URL ??
  ""
).replace(/\/$/, "");


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


export const apiBase = () => {
  if (typeof window !== "undefined" && window.location.protocol === "https:" && targetApi.startsWith("http:")) {
    return "/api/proxy";
  }
  return targetApi || "/api/proxy";
};
