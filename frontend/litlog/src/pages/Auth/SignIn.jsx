import React, { useContext, useEffect, useState } from 'react';
import '../../styles/signIn.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../libs/UserContext';

const SignIn = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const redirectTo = new URLSearchParams(location.search).get('redirect') || '/';

  useEffect(() => {
    if (user) {
      navigate(redirectTo, { replace: true });
    }
  }, [user]);

  if (user === undefined) return <div>세션 확인 중...</div>; // 세션 체크 중
  if (user) return null; // 로그인된 상태면 이동 중

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!id || !password) {
      alert('아이디와 비밀번호를 입력하세요.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:9090/sign-in', {
        id,
        password
      }, { withCredentials: true });

      const { status, message } = res.data;
      if (status === '성공') {
        // 세션 재확인 후 setUser
        const sessionRes = await axios.get('http://localhost:9090/session-check', { withCredentials: true });
        if (sessionRes.data.loggedIn) {
          setUser(sessionRes.data.id);
          navigate(redirectTo, { replace: true });
        } else {
          alert('세션 설정에 실패했습니다.');
        }
      } else {
        alert(message);
      }
    } catch (err) {
      alert('서버 오류로 로그인에 실패했습니다.');
      console.error(err);
    }
  };

  return (
    <div className="signin-wrapper">
      <h2>SIGN IN</h2>
      <div className="signin-box">
        <form className="signin-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>ID :</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password :</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Sign In</button>
        </form>

        <div className="signin-links">
          <a href="/find-id">Find ID</a> | <a href="/find-password">Reset Password</a>
        </div>
        <div className="signin-footer">
          Don’t have an account? <a href="/sign-up">Sign up</a>
        </div>
      </div>

      <div>
        <a href="/">HOME</a>
      </div>
    </div>
  );
};

export default SignIn;
