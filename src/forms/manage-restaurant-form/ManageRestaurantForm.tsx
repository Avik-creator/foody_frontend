import { Form } from "@/components/ui/form";
import { RestaurantFormData, restaurantformSchema } from "@/utils/ZodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/utils/Types";
import { useEffect } from "react";
import ManageRestaurantFormSkeleton from "@/Skeletons/ManageRestaurantFormSkeleton";

type Props = {
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
  restaurant?: Restaurant;
};

const ManageRestaurantForm = ({ onSave, isLoading, restaurant }: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(restaurantformSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  useEffect(() => {
    if (!restaurant) return;
    const deliveryPriceFormatted = parseInt(
      (restaurant.deliveryPrice / 100).toFixed(2)
    );

    const menuItemFormatted = restaurant.menuItems.map((item) => ({
      ...item,
      price: parseInt((item.price / 100).toFixed(2)),
    }));

    const updatedRestaurant = {
      ...restaurant,
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemFormatted,
    };

    form.reset(updatedRestaurant);
  }, [form, restaurant]);

  const onSubmit = (RestaurantSubmissionForm: RestaurantFormData) => {
    const formData = new FormData();

    formData.append("restaurantName", RestaurantSubmissionForm.restaurantName);
    formData.append("city", RestaurantSubmissionForm.city);
    formData.append("country", RestaurantSubmissionForm.country);

    formData.append(
      "deliveryPrice",
      (RestaurantSubmissionForm.deliveryPrice * 100).toString()
    );
    formData.append(
      "estimatedDeliveryTime",
      RestaurantSubmissionForm.estimatedDeliveryTime.toString()
    );
    RestaurantSubmissionForm.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });
    RestaurantSubmissionForm.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(
        `menuItems[${index}][price]`,
        (menuItem.price * 100).toString()
      );
    });

    if (RestaurantSubmissionForm.imageFile) {
      formData.append(`imageFile`, RestaurantSubmissionForm.imageFile);
    }

    onSave(formData);
  };

  if (isLoading) {
    return <ManageRestaurantFormSkeleton />;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit">Submit 🥝</Button>
        )}
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;
