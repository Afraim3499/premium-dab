import React from "react";

export default function AdminDashboardLoading() {
  return (
    <div className="w-full flex flex-col gap-8 animate-pulse-skeleton">
      {/* 1. Header/Title Skeleton */}
      <div className="flex items-center justify-between pb-2 border-b border-pd-border/40">
        <div className="flex flex-col gap-2">
          <div className="h-8 w-48 bg-pd-green-900/10 rounded-lg" />
          <div className="h-4 w-64 bg-pd-green-900/5 rounded" />
        </div>
        <div className="h-10 w-32 bg-pd-green-900/10 rounded-xl" />
      </div>

      {/* 2. Grid Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white border border-pd-border/60 p-6 rounded-2xl flex flex-col gap-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-28 bg-pd-green-900/5 rounded" />
              <div className="w-8 h-8 rounded-lg bg-pd-green-900/10" />
            </div>
            <div className="h-8 w-20 bg-pd-green-900/15 rounded-lg" />
            <div className="h-3 w-36 bg-pd-green-900/5 rounded" />
          </div>
        ))}
      </div>

      {/* 3. Main Data Panel Skeleton */}
      <div className="bg-white rounded-2xl border border-pd-border/80 shadow-sm overflow-hidden flex flex-col">
        {/* Table/Panel Header */}
        <div className="p-6 border-b border-pd-border/60 flex items-center justify-between bg-pd-cream-50/20">
          <div className="h-5 w-40 bg-pd-green-900/10 rounded" />
          <div className="h-8 w-24 bg-pd-green-900/5 rounded-lg" />
        </div>

        {/* Table Rows Skeleton */}
        <div className="p-6 flex flex-col gap-5">
          {/* Header Row */}
          <div className="grid grid-cols-5 gap-4 border-b border-pd-border/30 pb-3">
            {[1, 2, 3, 4, 5].map((col) => (
              <div key={col} className="h-4 w-20 bg-pd-green-900/5 rounded" />
            ))}
          </div>

          {/* Body Rows */}
          {[1, 2, 3, 4, 5].map((row) => (
            <div key={row} className="grid grid-cols-5 gap-4 items-center">
              <div className="h-5 w-24 bg-pd-green-900/10 rounded" />
              <div className="h-4 w-32 bg-pd-green-900/5 rounded" />
              <div className="h-4 w-16 bg-pd-green-900/5 rounded" />
              <div className="h-6 w-20 bg-pd-green-900/10 rounded-full" />
              <div className="h-8 w-20 bg-pd-green-900/5 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
