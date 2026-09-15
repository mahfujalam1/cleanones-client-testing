"use client";

import React from "react";
import { TbChevronLeft, TbChevronRight, TbSearch, TbX } from "react-icons/tb";

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

/** Search input styled to match the portal rather than Ant Design's default chrome. */
export function SearchField({ value, onChange, placeholder, className = "", autoFocus }: SearchFieldProps) {
  return (
    <div className={`relative ${className}`}>
      <TbSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        type="text"
        value={value}
        autoFocus={autoFocus}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-9 text-xs text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-[#009EE2] focus:ring-2 focus:ring-[#009EE2]/15"
      />
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => onChange("")}
          className="absolute right-2.5 top-1/2 flex h-5 w-5 -translate-y-1/2 cursor-pointer items-center justify-center rounded text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
        >
          <TbX className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

interface ListPaginationProps {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  /** Plural noun shown in the range summary, e.g. "locations". */
  label?: string;
}

/** Windowed pager: always shows at most five numbers around the current page. */
function pageWindow(page: number, pages: number) {
  const size = Math.min(5, pages);
  const start = Math.max(1, Math.min(page - Math.floor(size / 2), pages - size + 1));
  return Array.from({ length: size }, (_, index) => start + index);
}

export function ListPagination({ page, limit, total, onPageChange, label = "items" }: ListPaginationProps) {
  const pages = Math.max(1, Math.ceil(total / limit));
  if (total <= limit) return null;

  const first = total ? (page - 1) * limit + 1 : 0;
  const last = Math.min(page * limit, total);
  const numbers = pageWindow(page, pages);

  const arrow =
    "flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:border-[#009EE2] hover:text-[#009EE2] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-500";

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5"
    >
      <p className="text-[11px] text-slate-500">
        Showing <span className="font-semibold text-slate-700">{first}–{last}</span> of{" "}
        <span className="font-semibold text-slate-700">{total}</span> {label}
      </p>

      <div className="flex items-center gap-1">
        <button type="button" aria-label="Previous page" disabled={page <= 1} onClick={() => onPageChange(page - 1)} className={`cursor-pointer ${arrow}`}>
          <TbChevronLeft className="h-4 w-4" />
        </button>

        {numbers[0] > 1 && (
          <>
            <PageButton value={1} current={page} onClick={onPageChange} />
            {numbers[0] > 2 && <span className="px-1 text-[11px] text-slate-300">…</span>}
          </>
        )}

        {numbers.map((value) => (
          <PageButton key={value} value={value} current={page} onClick={onPageChange} />
        ))}

        {numbers[numbers.length - 1] < pages && (
          <>
            {numbers[numbers.length - 1] < pages - 1 && <span className="px-1 text-[11px] text-slate-300">…</span>}
            <PageButton value={pages} current={page} onClick={onPageChange} />
          </>
        )}

        <button type="button" aria-label="Next page" disabled={page >= pages} onClick={() => onPageChange(page + 1)} className={`cursor-pointer ${arrow}`}>
          <TbChevronRight className="h-4 w-4" />
        </button>
      </div>
    </nav>
  );
}

function PageButton({ value, current, onClick }: { value: number; current: number; onClick: (page: number) => void }) {
  const active = value === current;
  return (
    <button
      type="button"
      aria-current={active ? "page" : undefined}
      onClick={() => onClick(value)}
      className={`h-8 min-w-8 cursor-pointer rounded-lg border px-2 text-[11px] font-semibold transition-colors ${
        active
          ? "border-[#009EE2] bg-[#009EE2] text-white"
          : "border-slate-200 bg-white text-slate-600 hover:border-[#009EE2] hover:text-[#009EE2]"
      }`}
    >
      {value}
    </button>
  );
}
