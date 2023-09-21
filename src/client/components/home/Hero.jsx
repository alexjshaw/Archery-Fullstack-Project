import React, { useContext } from "react";
import logo from "../../assets/logo-no-background.png";
import { Box, Image, Text, Heading, Button } from "@chakra-ui/react";
import LoginButton from "../Login";
import SignupButton from "../Signup";
import LogoutButton from "../Logout";
import AuthContext from "../../context/AuthContext";
import { useAuth0 } from "@auth0/auth0-react";

const Hero = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const buttonProps = {
    m: "4",
    mb: "8",
    size: "md",
    colorScheme: "blue",
  };

  return (
    <Box>
      <Image
        src={logo}
        alt="Archery App Logo"
        className="app-logo"
        maxW="160px"
        m="4"
        mx="auto"
      />
      <Heading as="h1" size="2xl" m="4">
        Archery Scorecard
      </Heading>

      <Text fontSize="xl" maxW="650px" m="4" mx="auto">
        Welcome to Archery Scorecard, the best way to track your progress,
        challenge your friends and make every session count
      </Text>
      {!isAuthenticated && (
        <>
          <LoginButton buttonProps={buttonProps} />
          <SignupButton />
        </>
      )}
    </Box>
  );
};

export default Hero;
