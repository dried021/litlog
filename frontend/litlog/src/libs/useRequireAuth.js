import { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from './UserContext';

export function useRequireAuth() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user === undefined) return;

    if (user === null) {
      const redirectTo = location.pathname;
      navigate(`/sign-in?redirect=${redirectTo}`);
    }
  }, [user]);

  return user;
}
