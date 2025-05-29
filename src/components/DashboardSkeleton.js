import React from "react";

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

export default function DashboardSkeleton() {
  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <Skeleton className="h-8 sm:h-10 md:h-12 w-60 mx-auto mb-2" />
        <Skeleton className="h-4 w-72 mx-auto" />
      </div>

      {/* Summary Chart */}
      <div className="rounded-2xl bg-white shadow-xl p-6 mb-8">
        <Skeleton className="h-6 w-48 mx-auto mb-4" />
        <Skeleton className="h-[350px] w-full" />
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Pie Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <Skeleton className="h-6 w-48 mb-4" />
          <Skeleton className="h-[300px] w-full" />
        </div>

        {/* Department Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <Skeleton className="h-6 w-56 mb-4" />
          <Skeleton className="h-[300px] min-w-[500px] w-full" />
        </div>
      </div>

      {/* Monthly Borrow Trend */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <Skeleton className="h-6 w-64 mb-4" />
        <Skeleton className="h-[300px] w-full" />
      </div>
    </div>
  );
}
