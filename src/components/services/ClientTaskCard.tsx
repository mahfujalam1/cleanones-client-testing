"use client";

import React from "react";
import { DatePicker, Input, Select, Checkbox } from "antd";
import { TbPlus, TbTrash } from "react-icons/tb";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import { getPlaceholderTranslation } from "@/utils/translations";

export interface ClientTaskItem {
  name: string;
  schedule_type: string;
  frequency_type: string;
  fixed_date: string;
  duration_minutes?: number;
  is_photo_req: boolean;
  photo: Array<{ name: string }>;
  description: string;
}

interface ClientTaskCardProps {
  task: ClientTaskItem;
  taskIndex: number;
  updateTask: (index: number, update: Partial<ClientTaskItem>) => void;
  onRemove: () => void;
}

export function ClientTaskCard({
  task,
  taskIndex,
  updateTask,
  onRemove,
}: ClientTaskCardProps) {
  const params = useParams<{ locale: string }>();
  const p = getPlaceholderTranslation(params?.locale);
  return (
    <div className="space-y-3.5 rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
      {/* Header row: Task # + Remove */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <strong className="text-xs font-bold text-slate-800">Task {taskIndex + 1}</strong>
        <button
          type="button"
          onClick={onRemove}
          className="flex h-7 w-7 items-center justify-center rounded-lg border border-red-200 bg-white text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
          title="Remove task"
        >
          <TbTrash className="text-sm" />
        </button>
      </div>

      {/* Row 1: Task name & Schedule type */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-slate-700">Task name *</label>
          <Input
            required
            value={task.name}
            onChange={(e) => updateTask(taskIndex, { name: e.target.value })}
            placeholder={p.taskName}
            className="h-9 text-xs"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-slate-700">Schedule type *</label>
          <Select
            value="fixed_date"
            options={[
              { value: "fixed_date", label: "Fixed date (one-time)" },
            ]}
            className="w-full h-9"
          />
        </div>
      </div>

      {/* Row 2: Fixed date & Duration */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-slate-700">Fixed date *</label>
          <DatePicker
            value={task.fixed_date ? dayjs(task.fixed_date) : null}
            format="DD/MM/YYYY"
            onChange={(date) =>
              updateTask(taskIndex, {
                fixed_date: date ? date.format("YYYY-MM-DD") : "",
              })
            }
            className="w-full h-9"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-slate-700">Duration (min)</label>
          <Input
            type="number"
            min={1}
            value={task.duration_minutes ?? ""}
            onChange={(e) =>
              updateTask(taskIndex, {
                duration_minutes: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            placeholder={p.number}
            className="h-9 text-xs"
          />
        </div>
      </div>

      {/* Photo Required Checkbox */}
      <div className="pt-1">
        <Checkbox
          checked={task.is_photo_req}
          onChange={(e) =>
            updateTask(taskIndex, {
              is_photo_req: e.target.checked,
              photo: e.target.checked && (!task.photo || task.photo.length === 0) ? [{ name: "" }] : task.photo,
            })
          }
          className="text-xs font-semibold text-slate-700"
        >
          Photo required
        </Checkbox>
      </div>

      {/* Photo List (Optional) */}
      {task.is_photo_req && (
        <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-3">
          <p className="text-[11px] font-semibold text-slate-600">Attach photo description (Optional)</p>
          {task.photo.map((photoItem, pIdx) => (
            <div key={pIdx} className="flex gap-2">
              <Input
                value={photoItem.name}
                onChange={(e) =>
                  updateTask(taskIndex, {
                    photo: task.photo.map((item, idx) => (idx === pIdx ? { name: e.target.value } : item)),
                  })
                }
                placeholder={p.photo}
                className="h-8 text-xs"
              />
              <button
                type="button"
                onClick={() =>
                  updateTask(taskIndex, {
                    photo: task.photo.filter((_, idx) => idx !== pIdx),
                  })
                }
                className="flex h-8 w-8 items-center justify-center rounded border border-slate-200 bg-white text-red-500 hover:bg-red-50"
              >
                <TbTrash className="text-xs" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              updateTask(taskIndex, {
                photo: [...task.photo, { name: "" }],
              })
            }
            className="flex items-center gap-1 text-[11px] font-semibold text-sky-600 hover:underline cursor-pointer"
          >
            <TbPlus /> Add photo
          </button>
        </div>
      )}
    </div>
  );
}
