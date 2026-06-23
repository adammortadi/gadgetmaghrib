import { Skeleton } from "@/components/ui/skeleton";

export default function ProductSkeleton() {
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-neutral-200/50 shadow-premium flex flex-col h-full relative overflow-hidden">
      <div className="relative aspect-square overflow-hidden bg-neutral-100/60 p-4 m-2 rounded-xl flex items-center justify-center">
        <Skeleton className="w-full h-full rounded-xl bg-neutral-200/60" />
      </div>
      <div className="p-3 flex flex-col flex-grow gap-2">
        <Skeleton className="h-3 w-1/3 mb-1 bg-neutral-200/60" />
        <Skeleton className="h-4 w-full bg-neutral-200/60" />
        <Skeleton className="h-4 w-2/3 mb-2 bg-neutral-200/60" />
        <div className="mt-auto space-y-2">
          <Skeleton className="h-5 w-1/3 bg-neutral-200/60" />
          <div className="flex items-center justify-between">
            <Skeleton className="h-3 w-1/4 bg-neutral-200/60" />
            <Skeleton className="h-3 w-1/4 bg-neutral-200/60" />
          </div>
        </div>
      </div>
    </div>
  );
}
