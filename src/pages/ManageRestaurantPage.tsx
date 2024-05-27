import { useCreateMyRestaurant } from "@/api/MyRestaurantAPI";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateRestaurantLoading } =
    useCreateMyRestaurant();

  return (
    <ManageRestaurantForm
      onSave={createRestaurant}
      isLoading={isCreateRestaurantLoading}
    />
  );
};

export default ManageRestaurantPage;
