import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";
import { useGetMyUser } from "@/api/MyUserApi";
import { UserFormData } from "@/utils/ZodSchemas";

type Props = {
  onCheckout: (userProfileData: UserFormData) => void;
  disabled: boolean;
  title: string;
  isLoading: boolean;
};

const CheckoutButton = ({ onCheckout, disabled, title, isLoading }: Props) => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();
  const { pathname } = useLocation();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  const { currentUser, isLoading: isGetUserLoading } = useGetMyUser();

  if (!isAuthenticated) {
    return (
      <Button onClick={onLogin} className="bg-orange-300 flex-1">
        Log In to Check Out
      </Button>
    );
  }

  if (isAuthLoading || !currentUser || isLoading) {
    return <LoadingButton />;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className="bg-orange-300 flex-1">
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
        <UserProfileForm
          currentUser={currentUser!}
          onSave={onCheckout}
          isLoading={isGetUserLoading}
          title="Confirm Deliery Details"
          buttonText="Continue to payment"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutButton;
