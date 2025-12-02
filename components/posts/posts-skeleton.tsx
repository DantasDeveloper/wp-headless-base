import { Skeleton } from "@/components/ui/skeleton";

export function PostsSkeleton() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <article key={i} className="border border-border rounded-lg">
          <div className="p-3 pt-3">
            <Skeleton className="aspect-video rounded-lg" />
          </div>
          <div className="px-5 pb-5 space-y-3">
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-5 w-24" />
          </div>
        </article>
      ))}
    </div>
  );
}
