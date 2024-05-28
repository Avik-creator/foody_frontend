import UserProfileFormSkeleton from "@/Skeletons/UserProfileFormSkeleton";
import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantAPI";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateRestaurantLoading } =
    useCreateMyRestaurant();

  const { restaurant } = useGetMyRestaurant();
  const { updateRestaurant, isLoading } = useUpdateMyRestaurant();

  if (isLoading) {
    return <UserProfileFormSkeleton />;
  }

  return (
    <ManageRestaurantForm
      restaurant={restaurant}
      onSave={!!restaurant ? updateRestaurant : createRestaurant}
      isLoading={isCreateRestaurantLoading || isLoading}
    />
  );
};

export default ManageRestaurantPage;
