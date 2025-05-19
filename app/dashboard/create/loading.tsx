import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingCreateBlog() {
  return (
    <div>
      <div className="max-w-xl mx-auto">
        <div className="rounded-xl border border-gray-100 bg-white shadow-md p-6 space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <Skeleton className="h-6 w-1/3" /> {/* CardTitle */}
            <Skeleton className="h-4 w-2/3" /> {/* CardDescription */}
          </div>

          {/* Form fields */}
          <div className="space-y-4">
            {/* Title Field */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/6" /> {/* Label */}
              <Skeleton className="h-10 w-full rounded-md" /> {/* Input */}
            </div>

            {/* Content Field */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/6" />
              <Skeleton className="h-24 w-full rounded-md" /> {/* Textarea */}
            </div>

            {/* Image URL Field */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/6" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>

            {/* Submit Button */}
            <Skeleton className="h-10 w-32 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
