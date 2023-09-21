import loadingImage from "../assets/loading.svg";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "./shared/NavBar";
import { Center } from "@chakra-ui/react";

const PageLoader = () => {
  console.log('PageLoader Loaded')
  return (
    <div className="loader">
      <Center className="spinner">
      <img src={loadingImage} alt="Loading" />
      </Center>
    </div>
  );
};


export default PageLoader