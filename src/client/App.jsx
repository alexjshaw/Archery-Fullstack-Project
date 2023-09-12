import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";

import NavBar from './components/NavBar'
import Home from "./views/Home";
import Scores from "./views/Scores";
import Dashboard from "./views/Dashboard";
import CallbackPage from "./views/Callback";
import { AuthenticationGuard } from "./components/AuthenticationGuard";

import { Box } from '@chakra-ui/react';

function App() {
  console.log('App Loaded')
  const {isAuthenticated} = useAuth0()
  // console.log('isAuthenticated', isAuthenticated)

  return (
    <Box w="100vw" h="100vh" display="flex" flexDirection="column" bg={'gray.50'} className="App Box">
      {/* NavBar always visible at the top */}
      <NavBar />

      {/* Main content container */}
      <Box as="main" flex="1" overflowY="auto" display="flex" flexDirection="column" className="Content Box">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/scores"
            element={<AuthenticationGuard component={Scores} />}
          />
          <Route
            path="/dashboard"
            element={<AuthenticationGuard component={Dashboard} />}
          />
          <Route path="/callback" element={<CallbackPage />} />
          {/* You can add more routes as needed */}
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
