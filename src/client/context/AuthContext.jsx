import React from 'react';

const AuthContext = React.createContext({
  isAuthenticated: false,
  user: null,
  profileComplete: false
});

export default AuthContext;
