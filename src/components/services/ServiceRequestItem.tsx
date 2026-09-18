import React from "react";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import {
  TbLayoutGrid,
  TbSparkles,
  TbBrush,
  TbClock,
  TbCircleCheck,
  TbCircleCheckFilled,
} from "react-icons/tb";

export interface ServiceRequest {
  id: string;
  type: string;
  preferredDate: string;
  submittedDate: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "under_review" | "approved" | "completed";
  channel: "dashboard" | "email" | "whatsapp" | "call";
}

interface ServiceRequestItemProps {
  request: ServiceRequest;
}

export function ServiceRequestItem({ request }: ServiceRequestItemProps) {
  
  const getIcon = () => {
    const lowerType = request.type.toLowerCase();
    if (lowerType.includes("window")) return TbLayoutGrid;
    if (lowerType.includes("carpet") || lowerType.includes("floor")) return TbBrush;
    return TbSparkles; 
  };

  const Icon = getIcon();

  const priorityStyles = {
    high: "bg-red-50 text-red-700 border border-red-200/50",
    medium: "bg-amber-50 text-amber-700 border border-amber-200/50",
    low: "bg-slate-50 text-slate-600 border border-slate-200/50",
  };

  const priorityLabels = {
    high: "High Priority",
    medium: "Medium Priority",
    low: "Low Priority",
  };

  const statusStyles = {
    pending: "bg-slate-50 text-slate-500 border border-slate-200",
    under_review: "bg-amber-50 text-amber-700 border border-amber-200/30",
    approved: "bg-emerald-50 text-emerald-700 border border-emerald-200/50",
    completed: "bg-primary-light text-primary border border-primary/20",
  };

  return (
    <Card className="p-4 hover:border-slate-300 transition-colors space-y-3.5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          <IconBadge variant="primary" className="shrink-0 w-10 h-10">
            <Icon className="w-5 h-5" />
          </IconBadge>
          <div>
            <h4 className="text-xs font-bold text-slate-800 tracking-tight">{request.type}</h4>
            <p className="text-[10px] text-slate-500 mt-1">
              Preferred: {request.preferredDate} &bull; Submitted: {request.submittedDate}
            </p>
          </div>
        </div>

        
        <div className="flex items-center gap-2">
          <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${priorityStyles[request.priority]}`}>
            {priorityLabels[request.priority]}
          </span>
          <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded flex items-center gap-1 ${statusStyles[request.status]}`}>
            {request.status === "completed" && <TbCircleCheckFilled className="w-3.5 h-3.5 text-primary" />}
            {request.status === "approved" && <TbCircleCheck className="w-3.5 h-3.5 text-emerald-600" />}
            {request.status === "under_review" && <TbClock className="w-3.5 h-3.5 text-amber-600" />}
            {request.status.replace("_", " ")}
          </span>
        </div>
      </div>

      <div className="bg-slate-50/50 px-3 py-2.5 rounded border border-slate-100/50 text-[11px] text-slate-500 leading-relaxed">
        {request.description}
      </div>
      <p className="text-[10px] font-semibold text-slate-500">Preferred contact: <span className="capitalize text-sky-600">{request.channel}</span></p>
    </Card>
  );
}
