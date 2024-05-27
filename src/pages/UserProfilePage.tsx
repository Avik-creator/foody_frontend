import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

const UserProfilePage = () => {
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();
  const { currentUser, isLoading: isGetLoading } = useGetMyUser();

  if (isGetLoading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <div>Unable to Load user profile</div>;
  }

  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isUpdateLoading}
    />
  );
};

export default UserProfilePage;
