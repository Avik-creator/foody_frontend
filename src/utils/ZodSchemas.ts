import { z } from "zod";

export const formSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(1, { message: "Name is required" }),
  addressLine1: z.string().min(1, { message: "Address Line 1 is required" }),
  city: z.string().min(1, { message: "City is required" }),
  country: z.string().min(1, { message: "Country is required" }),
});

export type UserFormData = z.infer<typeof formSchema>;
