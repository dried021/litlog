import React, { useState } from 'react';
import '../../styles/signIn.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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
        alert('로그인 성공!');
        navigate('/');
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
