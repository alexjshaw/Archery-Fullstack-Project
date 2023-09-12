import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Button } from "@chakra-ui/react";

const LogoutButton = ({ buttonProps, setPersistentIsAuthenticated }) => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };
  
  return (
    <Button {...buttonProps} className="button__logout" onClick={handleLogout}>
      Log Out
    </Button>
  );
};

export default LogoutButton;