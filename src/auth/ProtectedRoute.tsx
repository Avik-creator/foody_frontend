import UserProfileFormSkeleton from "@/Skeletons/UserProfileFormSkeleton";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouter = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <UserProfileFormSkeleton />;
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRouter;
