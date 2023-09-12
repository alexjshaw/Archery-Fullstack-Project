import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const domain = import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_REACT_APP_AUTH0_CLIENT_ID;
const redirectUri = import.meta.env.VITE_REACT_APP_AUTH0_CALLBACK_URL;
const audience = import.meta.env.VITE_REACT_APP_AUTH0_AUDIENCE;


const Auth0ProviderWithNavigate = ({ children }) => {
  const navigate = useNavigate();

  // const domain = "dev-wn87thdr6glngf33.uk.auth0.com";
  // const clientId = "lru8CwBblWEEmrgiBIisWj6ieyMLFo4E";
  // const redirectUri = "http://localhost:3000/callback";

  // const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  // const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  // const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;
  // const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  // if (!(domain && clientId && redirectUri)) {
  //   return null;
  // }

  if (!(domain && clientId && redirectUri && audience)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        audience: audience,
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;

/*
    <Auth0Provider
      domain="dev-wn87thdr6glngf33.uk.auth0.com"
      clientId="lru8CwBblWEEmrgiBIisWj6ieyMLFo4E"
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: "http://new-archery-api",
        scope:
          "openid profile email read:current_user update:current_user_metadata",
      }}
      onRedirectCallback={onRedirectCallback}
    >
*/