import { useState, useEffect, useContext } from "react";
import reactLogo from "./assets/react.svg";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";

import NavBar from './components/NavBar'
import Home from "./views/Home";
import Scores from "./views/Scores";
import Dashboard from "./views/Dashboard";
import CallbackPage from "./views/Callback";
import PageLoader from "./components/PageLoader";
import { AuthenticationGuard } from "./components/AuthenticationGuard";
import AuthProvider from "./context/AuthProvider";
import AuthContext from "./context/AuthContext";

import { Box } from '@chakra-ui/react';

function App() {
  console.log('App Loaded');

  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
};

const MainApp = () => {
  console.log('MainApp Loaded')
  const { isLoading, profileComplete, updateProfileComplete } = useContext(AuthContext);

  useEffect(() => {
    const storedProfileComplete = localStorage.getItem('profileComplete');
    if (storedProfileComplete !== null) {
       updateProfileComplete(JSON.parse(storedProfileComplete));
    }
 }, [updateProfileComplete]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Box w="100vw" h="100vh" display="flex" flexDirection="column" bg={'gray.50'} className="App Box">
      {/* NavBar always visible at the top */}
      <NavBar />

      {/* Main content container */}
      <Box as="main" maxW='1280px' maxH="100%" mx={'auto'} flex="1" overflowY="auto" display="flex" flexDirection="column" className="Content Box" my={4}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/scores"
            element={<AuthenticationGuard component={Scores} />}
          />
          <Route
            path="/dashboard"
            element={<AuthenticationGuard component={Dashboard} isDashboard={true} />}
          />
          <Route path="/callback" element={<CallbackPage />} />
          {/* You can add more routes as needed */}
        </Routes>
      </Box>
    </Box>
  );
}


export default App;
