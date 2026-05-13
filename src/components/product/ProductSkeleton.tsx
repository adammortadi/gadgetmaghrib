import { Skeleton } from "@/components/ui/skeleton";

export default function ProductSkeleton() {
  return (
    <div className="rounded-2xl bg-[#0f0f0f] border border-white/5 overflow-hidden flex flex-col h-[400px]">
      <div className="relative aspect-square w-full bg-white/5 p-6">
        <Skeleton className="w-full h-full rounded-xl bg-white/10" />
      </div>
      <div className="p-5 flex-1 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-12 bg-white/10" />
          <Skeleton className="h-4 w-20 bg-white/10" />
        </div>
        <Skeleton className="h-6 w-full bg-white/10" />
        <Skeleton className="h-6 w-2/3 bg-white/10" />
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-24 bg-white/10" />
            <Skeleton className="h-4 w-16 bg-white/10" />
          </div>
          <Skeleton className="h-10 w-10 rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}
