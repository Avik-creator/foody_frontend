import { z } from "zod";

export const formSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(1, { message: "Name is required" }),
  addressLine1: z.string().min(1, { message: "Address Line 1 is required" }),
  city: z.string().min(1, { message: "City is required" }),
  country: z.string().min(1, { message: "Country is required" }),
});

export const restaurantformSchema = z
  .object({
    restaurantName: z.string({ required_error: "Restaurant Name is required" }),
    city: z.string({ required_error: "City is required" }),
    country: z.string({ required_error: "Country is required" }),
    deliveryPrice: z.coerce.number({
      required_error: "Delivery Price is required",
      invalid_type_error: "Delivery Price must be a number",
    }),
    estimatedDeliveryTime: z.coerce.number({
      required_error: "Estimated Delivery Time is required",
      invalid_type_error: "Estimated Delivery Time must be a number",
    }),
    cuisines: z.array(z.string()).nonempty({ message: "Cuisines is required" }),
    menuItems: z.array(
      z.object({
        name: z
          .string({ required_error: "Name is required" })
          .min(1, "Name is required"),
        price: z.coerce
          .number({
            required_error: "Price is required",
            invalid_type_error: "Price must be a number",
          })
          .min(1, { message: "Price must be greater than 0" }),
      })
    ),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "Image is required" }).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Image is required",
    path: ["imageFile"],
  });

export const searchSchema = z.object({
  searchQuery: z
    .string({ required_error: "Restaurant Name is Required" })
    .min(1, { message: "Search query is required" }),
});

export type SearchFormData = z.infer<typeof searchSchema>;

export type RestaurantFormData = z.infer<typeof restaurantformSchema>;

export type UserFormData = z.infer<typeof formSchema>;
