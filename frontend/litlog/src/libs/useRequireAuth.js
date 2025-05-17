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
      navigate('/sign-in', {
        state: { from: location.pathname }, 
        replace: true
      });
    }
  }, [user]);

  return user;
}
