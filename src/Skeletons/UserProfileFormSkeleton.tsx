import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserProfileFormSkeleton = () => {
  return (
    <div className="space-y-4 bg-gray-50 rounded-lg md:p-10">
      <div>
        <h2 className="text-2xl font-semibold">
          <Skeleton width={200} />
        </h2>
        <Skeleton width="100%" height={20} />
      </div>

      <div className="space-y-4">
        <Skeleton width="100%" height={50} />
        <Skeleton width="100%" height={50} />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Skeleton width="100%" height={50} />
        <Skeleton width="100%" height={50} />
        <Skeleton width="100%" height={50} />
      </div>

      <Skeleton width={100} height={40} />
    </div>
  );
};

export default UserProfileFormSkeleton;
