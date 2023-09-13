import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const [profileComplete, setProfileComplete] = useState(false);

  const updateProfileComplete = (value) => {
    setProfileComplete(value);
 };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, isLoading, profileComplete, updateProfileComplete }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;