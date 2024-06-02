import { Skeleton } from '../components/ui/skeleton';


const UserProfileFormSkeleton = () => {
  return (
    <div className="space-y-4 bg-gray-50 rounded-lg md:p-10 dark:bg-gray-950">
      <div>
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-6 w-full mt-2" />
      </div>
      <div className="space-y-4">
        <div>
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-10 w-full mt-2" />
        </div>
        <div>
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-10 w-full mt-2" />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
      <Skeleton className="h-12 w-32 mt-4" />
    </div>
  );
};

export default UserProfileFormSkeleton;
