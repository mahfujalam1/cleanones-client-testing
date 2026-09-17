# Socket.IO Mixed Content Fix (Vercel HTTPS + AWS HTTP)

## Problem

The client portal is hosted on **Vercel over HTTPS**. The backend (including Socket.IO) is on **AWS over HTTP**:

```
https://cleanones-client-portal.vercel.app
http://18.198.109.196:5001
```

Chat connected the browser **directly** to the AWS Socket.IO host. The browser then tried:

```
ws://18.198.109.196:5001/socket.io/?token=...&EIO=4&transport=websocket
```

HTTPS pages are not allowed to open insecure `ws://` (or `http://`) endpoints. Chrome blocked it as **Mixed Content**. Chat failed with:

- `This request has been blocked; this endpoint must be available over WSS.`
- `Socket is not connected. Please try again.`
- `Socket.IO connect_error: timeout`

REST APIs already avoided this by going through `/api/proxy`. Chat did not.

## Why this cannot be “just use wss://” on the frontend

Switching the client to `wss://18.198.109.196:5001` only works if the AWS server has TLS. It does not. The frontend-only fix is:

1. The **browser only talks HTTPS** to Vercel (same origin).
2. **Vercel (Node server)** talks HTTP to AWS. That hop is not mixed content, because it is server-to-server.

Vercel also cannot upgrade a browser WebSocket to that HTTP origin, so production chat uses Socket.IO **HTTP long-polling**, not WebSocket.

## What we tried that failed

### 1. Rewrite `/socket.io` to the AWS host

`next.config.ts` rewrites to `http://18.198.109.196:5001/socket.io` did not work on Vercel.

Requests still hit:

```
GET https://<vercel-app>/socket.io?EIO=4&transport=polling  →  404
```

Cause: `/socket.io` is treated like an app path. Locale routing (`src/proxy.ts`) can also intercept the first URL segment. The rewrite never became a real backend proxy.

### 2. Client path `/api/socket-io` + `vercel.json` rewrite

The client was pointed at `/api/socket-io`, but `vercel.json` had:

```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    }
  ]
}
```

That rule matches **every** `/api/*` request at the Vercel edge **before** Next.js route handlers. `/api/socket-io` never reached `app/api/socket-io/route.ts`, so it 404ed:

```
GET https://<vercel-app>/api/socket-io?EIO=4&transport=polling  →  404
xhr poll error
```

## Final solution

Same pattern as REST (`/api/proxy`): the browser stays on HTTPS, Next.js proxies to HTTP.

```
Browser (HTTPS)
  → GET/POST https://<vercel-app>/api/socket-io?EIO=4&transport=polling
  → Next.js route handler (Node)
  → http://18.198.109.196:5001/socket.io/?EIO=4&transport=polling
```

Local HTTP development is unchanged: the client still connects directly to AWS with WebSocket.

### 1. Detect mixed-content risk

`src/lib/socket/chatSocket.ts`

If the page is HTTPS and the API origin is `http:`, use the proxy:

- `baseUrl` = `window.location.origin` (Vercel)
- `path` = `/api/socket-io`
- `transports` = `['polling']` only (`upgrade: false`)

Otherwise (local HTTP):

- `baseUrl` = AWS origin (`http://18.198.109.196:5001`)
- `path` = `/socket.io`
- `transports` = `['websocket', 'polling']`

Token is still sent as `auth.token` and `query.token`.

### 2. Next.js proxy route

`src/app/api/socket-io/route.ts`

- Runtime: `nodejs`, `force-dynamic`, `maxDuration: 60` (polling can hold a request)
- Handles `GET`, `POST`, `HEAD`, `OPTIONS`
- Forwards method, query string, body, and safe headers to:

  `{API origin}/socket.io/{search}`

  Example: `http://18.198.109.196:5001/socket.io/?token=...&EIO=4&transport=polling`

- Origin is derived from `NEXT_PUBLIC_API_BASE_URL` / `API_BASE_URL` by stripping `/api/v1` (`src/utils/baseUrl.ts` → `apiHost`)

This must be a **Route Handler**, not only a rewrite. Rewrites to `/socket.io` 404ed on Vercel; `/api/*` is excluded from locale routing.

### 3. Remove the Vercel rewrite that swallowed `/api/*`

`vercel.json` no longer rewrites `/api/(.*)`. That file is empty (`{}`) so Next.js owns `/api/socket-io` and `/api/proxy`.

### 4. Keep REST proxy; do not rewrite sockets in `next.config.ts`

`next.config.ts` still rewrites:

```
/api/proxy/:path*  →  {NEXT_PUBLIC_API_BASE_URL}/:path*
```

Socket traffic is **not** rewritten there. It goes through the route handler.

Also set `skipTrailingSlashRedirect: true` so Engine.IO’s `/api/socket-io/?EIO=4` is not redirected and broken.

### 5. Locale proxy ignore list

`src/proxy.ts` matcher already skips `api`. `socket.io` was added as well so a stray `/socket.io` request is not rewritten to `/en/socket.io`.

## Files involved

| File | Change |
|------|--------|
| `src/lib/socket/chatSocket.ts` | HTTPS → same-origin polling via `/api/socket-io` |
| `src/app/api/socket-io/route.ts` | Server proxy to AWS `/socket.io` |
| `src/utils/baseUrl.ts` | Existing `apiHost` + `/api/proxy` for REST (unchanged idea) |
| `next.config.ts` | REST rewrite only; `skipTrailingSlashRedirect` |
| `vercel.json` | Removed `/api/(.*)` rewrite |
| `src/proxy.ts` | Ignore `socket.io` in locale matcher |

## How to verify after deploy

1. Open chat on the Vercel HTTPS URL.
2. In DevTools → Network, Socket.IO should request:

   `https://<vercel-app>/api/socket-io?token=...&EIO=4&transport=polling`

   **not** `ws://18.198.109.196:5001/socket.io`.

3. Status should be **200**, body should look like Engine.IO (`0{...}`), not a Next.js HTML 404.
4. Sending a message should succeed without `Socket is not connected`.

## Limits

- Production chat is polling, not a true WebSocket. Fine for this setup; slightly more HTTP chatter than `wss`.
- Vercel function timeout can cut a long poll (Hobby is shorter than Pro). If polling drops, check plan timeout vs Socket.IO ping interval.
- The durable fix on the backend is TLS (`https` + `wss` on AWS or a reverse proxy). This frontend proxy is the workaround while the API stays HTTP.
