import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../libs/UserContext';

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined); // undefined: 아직 세션 확인 전

  useEffect(() => {
    axios.get('http://localhost:9090/session-check', { withCredentials: true })
      .then(res => {
        console.log('[UserProvider] 세션 확인 응답:', res.data);
        if (res.data.loggedIn) {
          setUser(res.data.id);
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null));
  }, []);

  if (user === undefined) {
    // 세션 확인 중에는 아무것도 안 보이게 하거나 로딩 메시지
    return <div>세션 확인 중...</div>;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
