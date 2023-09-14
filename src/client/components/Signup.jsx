import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Button } from "@chakra-ui/react";

export const Signup = ({ buttonProps }) => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/dashboard",
      },
      authorizationParams: {
        prompt: "login",
        screen_hint: "signup",
      },
    });
  };

  return (
    <Button {...buttonProps} className="button__sign-up" onClick={handleSignUp}>
      Sign Up
    </Button>
  );
};

export default Signup