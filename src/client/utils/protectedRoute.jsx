import { Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ element, ...rest }) => {
  const { profileComplete } = useContext(AuthContext);

  return profileComplete ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/dashboard" replace />
  );
};

export default ProtectedRoute