// /app/dashboard/edit/[id]/loading.tsx

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="min-h-[85vh] flex rounded-lg border shadow overflow-hidden">
        {/* Left Panel */}
        <div className="w-[30%] min-w-[25%] p-6 border-r space-y-4">
          <Skeleton className="aspect-[4/3] w-full rounded-lg" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="flex flex-col gap-4 pt-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-[70%] min-w-[40%] p-6 space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-[300px] w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
