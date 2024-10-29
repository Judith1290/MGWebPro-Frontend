import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const PrivateRoutes = ({ children }) => {
  const { permission } = useAuthContext();

  if (!permission) {
    return <Navigate to={'/'} />;
  }

  if (permission == 1 || permission == 2) {
    return children;
  } else {
    return <Navigate to={'/'} />;
  }
};

export default PrivateRoutes;
