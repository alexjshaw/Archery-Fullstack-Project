import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Button } from "@chakra-ui/react";

const LoginButton = ({ buttonProps }) => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
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
    <Button {...buttonProps} className="button__login" onClick={handleLogin}>
      Log In
    </Button>
  );
};

export default LoginButton;