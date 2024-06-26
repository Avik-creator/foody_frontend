import { Restaurant, RestaurantSearchResult, SearchState } from "@/utils/Types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL!;

export const useSearchRestaurants = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResult> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisine", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sortOption);
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch restaurants");
    }

    return response.json();
  };

  const {
    data: results,
    isLoading,
    error,
  } = useQuery(["searchRestaurants", searchState], createSearchRequest, {
    enabled: !!city,
  });

  return { results, isLoading, error };
};

export const useGetRestaurant = (restaurantId?: string) => {
  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/${restaurantId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch restaurant");
    }

    return response.json();
  };

  const {
    data: restaurant,
    isLoading,
    error,
  } = useQuery(["getRestaurant", restaurantId], getMyRestaurantRequest, {
    enabled: !!restaurantId,
  });

  return { restaurant, isLoading, error };
};
