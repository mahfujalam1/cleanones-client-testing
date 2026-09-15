import { NextRequest } from "next/server";
import { apiHost, targetApi } from "@/utils/baseUrl";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const HOP_BY_HOP = new Set([
  "connection",
  "content-length",
  "host",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
]);

function backendOrigin(): string {
  if (apiHost) return apiHost;
  if (targetApi) {
    try {
      return new URL(targetApi).origin;
    } catch {
      return targetApi.replace(/\/api\/v1\/?$/, "").replace(/\/$/, "");
    }
  }
  return "";
}

function targetUrl(request: NextRequest, path: string[] = []): string {
  const origin = backendOrigin().replace(/\/$/, "");
  const extra = path.length ? `/${path.join("/")}` : "";
  return `${origin}/socket.io${extra}${request.nextUrl.search}`;
}

async function proxySocket(request: NextRequest, path: string[] = []): Promise<Response> {
  const origin = backendOrigin();
  if (!origin) {
    return Response.json({ message: "Socket proxy is not configured." }, { status: 500 });
  }

  const headers = new Headers();
  request.headers.forEach((value, key) => {
    if (!HOP_BY_HOP.has(key.toLowerCase())) {
      headers.set(key, value);
    }
  });

  const init: RequestInit = {
    method: request.method,
    headers,
    redirect: "manual",
    cache: "no-store",
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = await request.arrayBuffer();
    Object.assign(init, { duplex: "half" });
  }

  const upstream = await fetch(targetUrl(request, path), init);
  const responseHeaders = new Headers();
  upstream.headers.forEach((value, key) => {
    if (!HOP_BY_HOP.has(key.toLowerCase())) {
      responseHeaders.append(key, value);
    }
  });

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  });
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path?: string[] }> }
) {
  const { path = [] } = await context.params;
  return proxySocket(request, path);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path?: string[] }> }
) {
  const { path = [] } = await context.params;
  return proxySocket(request, path);
}
