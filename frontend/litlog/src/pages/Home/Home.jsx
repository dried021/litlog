import React, { useContext } from 'react';
import { UserContext } from '../../libs/UserContext';
import { useLogout } from '../../libs/useLogout';

const Home = () => {
  const { user } = useContext(UserContext);
  const logout = useLogout(); // ✅ 가져옴

  return (
    <div>
      <h2>메인 페이지</h2>
      {user && <button onClick={() => logout('/')}>로그아웃</button>}
    </div>
  );
};

export default Home;
