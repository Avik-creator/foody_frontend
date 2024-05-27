export type UpdateMyUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export type CreateUserRequest = {
  auth0Id: string;
  email: string;
};
