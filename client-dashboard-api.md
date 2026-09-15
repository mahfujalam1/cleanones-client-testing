# Client Dashboard API

Base URL: `/api/v1/client`

All endpoints below require:

- **Auth**: `Authorization: Bearer <token>`
- **Role**: `client` (the endpoint resolves the authenticated user's client profile automatically — no client ID needed in the URL)

Standard envelope for every response:

```json
{
  "success": true,
  "message": "string",
  "data": { }
}
```

Error responses:

```json
{
  "success": false,
  "message": "string",
  "errorSources": [{ "path": "string", "message": "string" }]
}
```

| Status | Meaning |
|---|---|
| 400 | Invalid input (e.g. bad `range` value) |
| 401 | Missing/invalid/expired token, or wrong role |
| 403 | Account blocked or inactive |
| 404 | Client profile not found |
| 429 | Rate limited |
| 500 | Server error |

---

## 1. `GET /client/active-progress`

Live view of **today only**: room/task completion and real worked hours derived from each worker's actual check-in/check-out. Poll this every 30–60s while `status` is `"active"`; otherwise poll less frequently.

**Query params**: none

### Response `data`

```ts
{
  date: string;           // "2026-09-15"
  status: "no_service" | "scheduled" | "active" | "completed";
  summary: {
    total_estimated_hours: number;  // planned hours for today's shifts
    total_worked_hours: number;     // real hours from check-in/out (0 until a worker checks in)
    total_rooms: number;
    completed_rooms: number;
    total_tasks: number;
    completed_tasks: number;
    progress_percentage: number;    // 0-100, rounded
  };
  shifts: Array<{
    shift_id: string;
    location_name: string;
    status: "upcoming" | "in_progress" | "completed" | "cancelled";
    start_time: string;             // ISO date-time
    estimated_hours: number;
    rooms: { total: number; completed: number };
    tasks: { total: number; completed: number };
    workers: Array<{
      worker_id: string;
      name: string;
      role: "Team leader" | "Co-leader" | "Normal worker";
      is_checked_in: boolean;       // true = checked in, not yet checked out
      check_in_at: string | null;   // ISO date-time
      check_out_at: string | null;  // ISO date-time
      worked_hours: number;         // 0 if not checked in yet
    }>;
  }>;
}
```

**`status` meaning**:
- `no_service` — nothing scheduled today
- `scheduled` — shifts exist today but none are `in_progress` yet
- `active` — at least one shift is `in_progress`
- `completed` — every shift today is `completed` or `cancelled`

**A room counts as "completed"** once every plan task scoped to that room (not one-off additional tasks) has `is_completed: true`.

### Example

```json
{
  "success": true,
  "message": "Client active progress retrieved successfully",
  "data": {
    "date": "2026-09-15",
    "status": "active",
    "summary": {
      "total_estimated_hours": 6.5,
      "total_worked_hours": 2.25,
      "total_rooms": 8,
      "completed_rooms": 3,
      "total_tasks": 20,
      "completed_tasks": 9,
      "progress_percentage": 45
    },
    "shifts": [
      {
        "shift_id": "66f1a2b3c4d5e6f7a8b9c0d1",
        "location_name": "Downtown Office",
        "status": "in_progress",
        "start_time": "2026-09-15T09:00:00.000Z",
        "estimated_hours": 6.5,
        "rooms": { "total": 8, "completed": 3 },
        "tasks": { "total": 20, "completed": 9 },
        "workers": [
          {
            "worker_id": "66f1a2b3c4d5e6f7a8b9c0d2",
            "name": "Maria Gomez",
            "role": "Team leader",
            "is_checked_in": true,
            "check_in_at": "2026-09-15T09:05:00.000Z",
            "check_out_at": null,
            "worked_hours": 2.25
          }
        ]
      }
    ]
  }
}
```

---

## 2. `GET /client/shift-stats`

Historical shift counts grouped by status, over a selectable window. Not live — safe to poll infrequently (e.g. on page load, or every few minutes).

### Query params

| Param | Type | Required | Default | Values |
|---|---|---|---|---|
| `range` | string | no | `today` | `today` \| `this_week` \| `this_month` |

`this_week` runs Sunday → Saturday (server local time). `this_month` is the calendar month.

### Response `data`

```ts
{
  range: "today" | "this_week" | "this_month";
  date_from: string;              // ISO date-time, inclusive
  date_to: string;                // ISO date-time, inclusive
  total_shifts: number;
  total_completed_shifts: number;
  total_pending_shifts: number;   // upcoming + in_progress
  total_cancelled_shifts: number;
  completion_rate: number;        // 0-100, rounded: completed / (total - cancelled)
}
```

### Example

```
GET /api/v1/client/shift-stats?range=this_week
```

```json
{
  "success": true,
  "message": "Client shift stats retrieved successfully",
  "data": {
    "range": "this_week",
    "date_from": "2026-09-13T00:00:00.000Z",
    "date_to": "2026-09-19T23:59:59.999Z",
    "total_shifts": 12,
    "total_completed_shifts": 7,
    "total_pending_shifts": 4,
    "total_cancelled_shifts": 1,
    "completion_rate": 64
  }
}
```

---

## 3. `GET /client/totals`

Static, all-time inventory counts. Changes rarely — safe to cache on the frontend (e.g. fetch once per session, or revalidate every few minutes).

**Query params**: none

### Response `data`

```ts
{
  total_cleaning_plans: number;
  total_locations: number;
  total_rooms: number;
  total_tasks: number;
}
```

### Example

```json
{
  "success": true,
  "message": "Client totals retrieved successfully",
  "data": {
    "total_cleaning_plans": 3,
    "total_locations": 2,
    "total_rooms": 24,
    "total_tasks": 96
  }
}
```

---

## Suggested frontend usage

| Dashboard section | Endpoint | Poll interval |
|---|---|---|
| Live progress ring, on-site team, worked hours | `/client/active-progress` | 30–60s while `status === 'active'`, else on-demand |
| Shift history cards / filter tabs (Today, This Week, This Month) | `/client/shift-stats?range=...` | on tab change / page load |
| Static inventory summary (plans, locations, rooms, tasks) | `/client/totals` | once per session |

Full interactive schema (try-it-out included) is also available at `/api-docs` (Swagger UI, tag: **Clients**), and the raw OpenAPI JSON at `/api-docs.json`.
