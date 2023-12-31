import { withAuthenticationRequired } from "@auth0/auth0-react";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLoader from "../components/PageLoader";
import AuthContext from "../context/AuthContext";
import { Box } from "@chakra-ui/react";

const AuthenticationGuard = ({ component, isDashboard = false }) => {
  console.log('AuthenticationGuard Loaded')
  const navigate = useNavigate();
  const { profileComplete } = useContext(AuthContext);
  const localProfileComplete = localStorage.getItem("profileComplete") === "true";

  useEffect(() => {
    if (!profileComplete && !localProfileComplete) {
      navigate("/dashboard");
    }
  }, [profileComplete, localProfileComplete, navigate]);

  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="page-layout">
        <PageLoader />
      </div>
    ),
  });

  if (!isDashboard && !profileComplete && !localProfileComplete) {
    return <PageLoader />;
  }

  return <Component />;
};

export default AuthenticationGuard