import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../libs/UserContext';

export function useLogout() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = async (redirectTo = '/') => {
    try {
      await axios.post('http://localhost:9090/sign-out', {}, { withCredentials: true });
      setUser(null);
      sessionStorage.removeItem('user');
      navigate(redirectTo);
    } catch (err) {
      alert('Logout failed');
      console.error(err);
    }
  };

  return logout;
}
