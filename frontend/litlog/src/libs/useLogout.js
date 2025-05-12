// src/hooks/useLogout.js (또는 libs 디렉토리 등 원하는 위치)
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
      navigate(redirectTo);
    } catch (err) {
      alert('로그아웃 실패');
      console.error(err);
    }
  };

  return logout;
}
