import UserProfileFormSkeleton from "@/Skeletons/UserProfileFormSkeleton";
import { useSearchRestaurants } from "@/api/RestaurantAPI";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import { useNavigate, useParams } from "react-router-dom";
import { SearchState } from "@/utils/Types";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import { SearchFormData } from "@/utils/ZodSchemas";
import PaginationSelector from "@/components/PaginationSelector";
import CuisineFilter from "@/components/CuisineFilter";

const SearchPage = () => {
  const navigate = useNavigate();
  const { city } = useParams();

  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
  });
  const { results, isLoading, error } = useSearchRestaurants(
    searchState,
    city!
  );

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page: page,
    }));
  };

  const setSearchQuery = (searchQuery: SearchFormData) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchQuery.searchQuery,
    }));
  };

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const resetSearch = () => {
    setSearchState({
      searchQuery: "",
      page: 1,
      selectedCuisines: [],
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-4xl">
          <UserProfileFormSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    navigate("/404");
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        <CuisineFilter
          isExpanded={isExpanded}
          onExpandedClick={() => {
            setIsExpanded(!isExpanded);
          }}
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchResultInfo total={results?.pagination.total!} city={city!} />
        <SearchBar
          onSubmit={setSearchQuery}
          placeHolder="Search By Cuisine or Restaurant Name"
          onReset={resetSearch}
          searchQuery={searchState.searchQuery}
        />
        {results?.data.map((restaurant) => (
          <SearchResultCard key={restaurant._id} restaurant={restaurant} />
        ))}

        <PaginationSelector
          page={results?.pagination.page!}
          pages={results?.pagination.pages!}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};
export default SearchPage;
