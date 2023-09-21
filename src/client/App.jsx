import { useEffect, useContext } from "react";
import "./App.css";
import {
  Box,
  Flex,
} from "@chakra-ui/react"
import { Routes, Route } from 'react-router-dom';

import NavBar from "./components/shared/NavBar"
import ScoresView from "./views/ScoresView"
import PageLoader from "./components/PageLoader"
import AuthenticationGuard from "./utils/AuthenticationGuard"
import AuthProvider from "./context/AuthProvider"
import AuthContext from "./context/AuthContext";
import HomeView from "./views/HomeView";
import DashboardView from "./views/DashboardView";

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  )
}

const MainApp = () => {

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
    <Box w="100vw" h="100vh" bg="gray.50" className="App Box">
      <Flex direction="column" height="100%">
        <NavBar />
        <Box as="main" maxW='90vw' w={"100%"} mx={'auto'} overflowY="auto" className="Content Box" mb={4} >
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route
            path="/dashboard"
            element={<AuthenticationGuard component={DashboardView} isDashboard={true}/>} />
            <Route
            path="/scorecard"
            element={<AuthenticationGuard component={ScoresView} />} />
          </Routes>
        </Box>
      </Flex>
    </Box>
  );
}

export default App;
