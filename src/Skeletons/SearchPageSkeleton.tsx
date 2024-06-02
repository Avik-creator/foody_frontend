import { Skeleton } from '../components/ui/skeleton';

const CuisineFilterSkeleton = () => {
  return (
    <div>
      <div className="flex justify-between items-center px-2">
        <Skeleton className="h-6 w-32 mb-2 pb-3" />
        <Skeleton className="h-6 w-24 mb-2 pb-3" />
      </div>
      <div className="space-y-2 flex flex-col">
        {[...Array(7)].map((_, index) => (
          <div key={index} className="flex items-center">
            <Skeleton className="h-8 w-8 rounded mr-2" />
            <Skeleton className="h-8 w-full rounded-lg" />
          </div>
        ))}
      </div>
      <Skeleton className="h-8 w-32 mt-4" />
    </div>
  );
};

const SearchBarSkeleton = () => {
  return (
    <div className="gap-1 flex items-center lg:gap-3 justify-between flex-row border border-gray-400 dark:border-gray-900 rounded-xl p-1 md:p-2">
      <Skeleton className="h-8 w-8 ml-1 hidden md:block" />
      <Skeleton className="h-10 flex-1 rounded-lg" />
      <Skeleton className="h-10 w-24 rounded-xl hidden md:block" />
      <Skeleton className="h-10 w-10 rounded-xl block md:hidden" />
      <Skeleton className="h-10 w-24 rounded-xl" />
    </div>
  );
};

const SearchResultInfoSkeleton = () => {
  return (
    <div className="text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
      <Skeleton className="h-6 w-64" />
    </div>
  );
};

const SortOptionDropdownSkeleton = () => {
  return (
    <Skeleton className="h-10 w-40" />
  );
};

const SearchResultCardSkeleton = () => {
  return (
    <div className="grid lg:grid-cols-[2fr_3fr] gap-5">
      <Skeleton className="h-24 w-full rounded-md" />
      <div>
        <Skeleton className="h-8 w-3/4 mb-2" />
        <div id="card-content" className="grid md:grid-cols-2 gap-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
        <div className="flex gap-2 flex-col mt-2">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-6 w-1/4" />
        </div>
      </div>
    </div>
  );
};

const PaginationSelectorSkeleton = () => {
  return (
    <div className="flex gap-2 justify-center">
      {[...Array(5)].map((_, index) => (
        <Skeleton key={index} className="h-8 w-8 rounded-full" />
      ))}
    </div>
  );
};

const SearchPageSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 p-4">
      <div id="cuisines-list" className="lg:col-span-1">
        <CuisineFilterSkeleton />
      </div>
      <div id="main-content" className="flex flex-col gap-5 lg:col-span-1">
        <SearchBarSkeleton />
        <div className="flex flex-col gap-3 lg:flex-row justify-between">
          <SearchResultInfoSkeleton />
          <SortOptionDropdownSkeleton />
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <SearchResultCardSkeleton key={index} />
          ))}
        </div>
        <PaginationSelectorSkeleton />
      </div>
    </div>
  );
};

export default SearchPageSkeleton;
