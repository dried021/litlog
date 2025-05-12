import React, { useState } from 'react';
import '../../styles/findId.css';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FindId = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const handleFindId = async () => {
    if (!name || !email) return alert('이름과 이메일을 모두 입력하세요.');

    try {
      await axios.post('http://localhost:9090/find-id', { name, email }, { withCredentials: true });
      setSent(true);
    } catch (err) {
      if (err.response?.status === 404) {
        alert('해당 정보로 가입된 아이디가 없습니다.');
      } else {
        alert('오류가 발생했습니다.');
        console.error(err);
      }
    }
  };

  return (
    <div className="findid-find-wrapper">
      <h2>FIND ID</h2>

      {!sent ? (
        <div className="findid-find-box">
          <div className="findid-form-group">
            <label>Name :</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="findid-form-group">
            <label>Email :</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="findid-button-row">
            <span className="findid-btn-confirm" onClick={handleFindId}>Confirm</span>
            <span className="findid-divider">|</span>
            <span className="findid-btn-cancel" onClick={() => navigate('/sign-in')}>Cancel</span>
          </div>


          <div className="findid-link-row">
            Forgot your password? <a href="/find-password">Reset Password</a>
          </div>
        </div>
      ) : (
        <div className="findid-result-box">
          <p>
            We sent your ID to your email address.
            <br />
            Please check your inbox!
          </p>
          <button onClick={() => navigate('/sign-in')}>Sign In</button>
        </div>
      )}
    </div>
  );
};

export default FindId;
