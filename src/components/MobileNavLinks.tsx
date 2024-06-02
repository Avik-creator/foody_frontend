import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";

const MobileNavLinks = () => {
  const { logout } = useAuth0();
  return (
    <>
      <Link
        to="/user-profile"
        className="flex bg-white items-center font-bold hover:text-orange-300"
      >
        User Profile
      </Link>

      <Link
        to="/manage-restaurant"
        className="flex items-center font-bold hover:text-orange-300"
      >
        Manage Restaurant
      </Link>

      <Link
        to="/order-status"
        className="flex items-center font-bold hover:text-orange-300"
      >
        Order Status
      </Link>

      <Button
        onClick={() => logout()}
        className="flex items-center px-3 font-bold hover:bg-gray-500 w-full"
      >
        Log Out
      </Button>
    </>
  );
};

export default MobileNavLinks;
