import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingVideo() {
  return (
    <div className="pt-4">
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[150px] w-full rounded-xl sm:h-[300px]" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-[100px] w-full" />
        </div>
      </div>
    </div>
  );
}
