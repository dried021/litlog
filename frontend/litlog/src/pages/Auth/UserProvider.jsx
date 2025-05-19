import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../libs/UserContext';

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined); 

  useEffect(() => {
    axios.get('http://localhost:9090/session-check', { withCredentials: true })
      .then(res => {
        console.log('[UserProvider] Session response:', res.data);
        if (res.data.loggedIn) {
          setUser(res.data.id);
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null));
  }, []);

  if (user === undefined) {
    return <div>Checking session...</div>;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
