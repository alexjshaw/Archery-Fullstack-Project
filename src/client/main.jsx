import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import history from "./utils/history";
import { BrowserRouter } from "react-router-dom";
import Auth0ProviderWithNavigate from "./utils/auth0-provider-with-navigate";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <BrowserRouter history={history}>
      <ChakraProvider>
        <Auth0ProviderWithNavigate>
          <App />
        </Auth0ProviderWithNavigate>
      </ChakraProvider>
    </BrowserRouter>
  // </React.StrictMode>
);
