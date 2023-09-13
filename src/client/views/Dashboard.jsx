import React, { useEffect, useState, Fragment, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AuthContext from "../context/AuthContext";
import PageLoader from "../components/PageLoader";
import RegistrationForm from "../components/RegistrationForm";

const Dashboard = () => {
  console.log('Dashboard Loaded')

  const { isAuthenticated, user, profileComplete, updateProfileComplete } = useContext(AuthContext);
  const [isReady, setIsReady] = useState(false)
  const [currentUser, setCurrentUser] = useState({})

  const { getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    const checkProfileCompletion = async () => {
      if (!profileComplete) {
        const token = await getAccessTokenSilently();
        const getOptions = {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        const response = await fetch('http://localhost:3000/user', getOptions);
        const responseData = await response.json();
        setCurrentUser(responseData.data)

        const isProfileComplete = Boolean(
          responseData.data.profile.firstName &&
          responseData.data.profile.lastName &&
          responseData.data.equipments.length > 0 &&
          responseData.data.archerProfiles.length > 0
        );

        updateProfileComplete(isProfileComplete);

        localStorage.setItem('profileComplete', JSON.stringify(isProfileComplete));
      }
      setIsReady(true)
    };

    checkProfileCompletion();
  }, [profileComplete, getAccessTokenSilently, updateProfileComplete]);

  if (!isReady) {
    return <PageLoader />;
  }

  return (
    <Fragment>

      {profileComplete ? <p>PROFILE COMPLETE</p> : <RegistrationForm currentUser={currentUser} />}
    </Fragment>
  );
}

export default Dashboard;

/*
  function logToken() {
    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()
      console.log(accessToken)
    }
    getToken()
  }

  function showUser() {
    console.log('user', user)
    console.log('isAuthenticated', isAuthenticated)
  }

  function setState() {
    setIsReady(true)
  }

  function logState() {
    console.log('isReady', isReady)
  }

  function logProfileComplete() {
    console.log('profileComplete', profileComplete)
  }
  
  function toggleProfileComplete() {
    updateProfileComplete(!profileComplete)
  }

  async function getUser() {
    const token = await getAccessTokenSilently()
    const getOptions = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    const response = await fetch('http://localhost:3000/user', getOptions);
    const responseData = await response.json();
    console.log('getUser reached end')
    console.log('responseData', responseData.data)
    console.log('responseData', responseData.data.profile.firstName)
    console.log('responseData', responseData.data.profile.lastName)
    console.log('responseData', responseData.data.equipments.length)
    console.log('responseData', responseData.data.archerProfiles.length)
  }

        <p>DASHBOARD PAGE</p>
      <button onClick={showUser}>View User</button>
      <button onClick={logToken}>LOG TOKEN</button>
      <button onClick={setState}>Set State</button>
      <button onClick={logState}>Log State</button>
      <button onClick={logProfileComplete}>Log profileComplete</button>
      <button onClick={toggleProfileComplete}>Update profileComplete</button>
      <button onClick={getUser}>Get User From Database</button>

      */