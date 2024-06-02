import { Skeleton } from '../components/ui/skeleton';

// Skeleton for OrderStatusHeader
const OrderStatusHeaderSkeleton = () => {
  return (
    <div className="space-y-3">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-4 w-full" />
    </div>
  );
};

// Skeleton for OrderStatusDetail
const OrderStatusDetailSkeleton = () => {
  return (
    <div className="space-y-5">
      <div className="flex flex-col space-y-2">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-6 w-3/4" />
      </div>
      <div className="flex flex-col space-y-2">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-6 w-3/4" />
      </div>
      <Skeleton className="h-4 w-full" />
      <div className="flex flex-col space-y-2">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-6 w-1/2" />
      </div>
    </div>
  );
};

export const OrderStatusSkeleton = () => {
  return (
    <div className="space-y-10">
      {[...Array(2)].map((_, index) => (
        <div key={index} className="space-y-10 bg-gray-50 p-10 rounded-lg dark:bg-gray-950">
          <OrderStatusHeaderSkeleton />
          <div className="grid gap-10 md:grid-cols-2">
            <OrderStatusDetailSkeleton />
            <Skeleton className="h-full w-full rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
};
