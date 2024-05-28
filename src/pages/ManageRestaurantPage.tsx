import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
} from "@/api/MyRestaurantAPI";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateRestaurantLoading } =
    useCreateMyRestaurant();

  const { restaurant } = useGetMyRestaurant();

  return (
    <ManageRestaurantForm
      restaurant={restaurant}
      onSave={createRestaurant}
      isLoading={isCreateRestaurantLoading}
    />
  );
};

export default ManageRestaurantPage;
