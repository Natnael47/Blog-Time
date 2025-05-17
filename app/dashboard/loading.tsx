import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((__, idx) => {
        return (
          <div
            key={idx}
            className="rounded-lg border border-gray-100 bg-white shadow-md p-4 space-y-4"
          >
            {/* Image placeholder */}
            <Skeleton className="h-48 w-full rounded-lg" />

            {/* Title and excerpt */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>

            {/* Author and date */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
