import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext } from "react";
import { Button } from "@chakra-ui/react";
import AuthContext from "../context/AuthContext";

const LogoutButton = ({ isLoading }) => {
  const { logout } = useAuth0();
  const { updateProfileComplete } = useContext(AuthContext)

  const handleLogout = () => {
    localStorage.removeItem("profileComplete");
    updateProfileComplete(false);

    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };
  
  return (
    <Button
    isLoading={isLoading}
    className="button__logout" onClick={handleLogout}>
      Log Out
    </Button>
  );
};

export default LogoutButton;