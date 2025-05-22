import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../libs/UserContext';

const AdminRoute = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  if (user.userType !== 1 || user.userStatus === 3) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />; 
};

export default AdminRoute;
