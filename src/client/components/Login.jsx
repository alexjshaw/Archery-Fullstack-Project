import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext } from "react";
import { Button } from "@chakra-ui/react";
import AuthContext from "../context/AuthContext";

const LoginButton = ({ isLoading }) => {
  const { loginWithRedirect } = useAuth0();
  const { updateProfileComplete } = useContext(AuthContext)

  const handleLogin = async () => {
    localStorage.removeItem("profileComplete");
    updateProfileComplete(false);

    await loginWithRedirect({
      appState: {
        returnTo: "/dashboard",
      },
      authorizationParams: {
        prompt: "login",
      },
    });
  };
  
  return (
    <Button
    isLoading={isLoading}
    className="button__login" onClick={handleLogin}>
      Log In
    </Button>
  );
};

export default LoginButton;