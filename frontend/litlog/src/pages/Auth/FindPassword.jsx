import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/findPassword.css';
import { useNavigate } from 'react-router-dom';

const FindPassword = () => {
  const [step, setStep] = useState(1);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [timeLeft, setTimeLeft] = useState(180); // 3분
  const [timerRunning, setTimerRunning] = useState(false);
  const navigate = useNavigate();

  // 인증코드 타이머 동작
  useEffect(() => {
    if (!timerRunning) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          alert("⏰ 인증 시간이 만료되었습니다. 다시 시도해주세요.");
          setStep(1);
          setCode('');
          setTimerRunning(false);
          return 180;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [step, timerRunning]);

  const handleSendCode = async () => {
    if (!id || !name || !email) return alert('모든 항목을 입력해주세요.');
    try {
      await axios.post('http://localhost:9090/find-password/send-code', { id, name, email }, { withCredentials: true });
      alert('인증코드를 이메일로 보냈습니다.');
      setStep(2);
      setTimeLeft(180);
      setTimerRunning(true); // ⬅️ 여기로 이동해야 즉시 반응함
    } catch (err) {
      alert('입력하신 정보로 가입된 계정을 찾을 수 없습니다.');
      console.error(err);
    }
  };

  const handleVerifyCode = async () => {
    if (!code) return alert('인증코드를 입력하세요.');
    try {
      await axios.post('http://localhost:9090/find-password/verify-code', { id, code }, { withCredentials: true });
      alert('인증되었습니다. 새 비밀번호를 입력하세요.');
      setStep(3);
    } catch (err) {
      alert('인증코드가 올바르지 않습니다.');
      console.error(err);
    }
  };

  const handleResetPassword = async () => {
    if (newPwd.length < 6) {
      alert("비밀번호는 최소 6자리 이상이어야 합니다.");
      return;
    }
    if (newPwd !== confirmPwd) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await axios.post('http://localhost:9090/find-password/submit-new', { id, newPwd }, { withCredentials: true });
      alert("비밀번호가 재설정되었습니다.");
      navigate('/sign-in');
    } catch (err) {
      alert("비밀번호 변경에 실패했습니다.");
      console.error(err);
    }
  };

  return (
    <div className="findpassword-reset-wrapper">
      <h2>Reset Password</h2>
      <div className="findpassword-reset-box">
        {step === 1 && (
          <>
            <div className="findpassword-form-group">
              <label>Name :</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="findpassword-form-group">
              <label>ID :</label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
            <div className="findpassword-form-group">
              <label>Email :</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="findpassword-button-row">
              <span className="findpassword-btn-confirm" onClick={handleSendCode}>Confirm</span>
              <span className="findpassword-divider">|</span>
              <span className="findpassword-btn-cancel" onClick={() => navigate('/sign-in')}>Cancel</span>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <p>Check your email for a verification code.</p>
            <p className="findpassword-timer-text">⏳ 남은 시간: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</p>
            <div className="findpassword-form-group">
              <label>Code :</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <div className="findpassword-button-row">
              <span className="findpassword-btn-cancel" onClick={handleVerifyCode}>Confirm</span>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="findpassword-form-group">
              <label>New Password :</label>
              <input
                type="password"
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
              />
            </div>

            <div className="findpassword-form-group">
              <label>Confirm Password :</label>
              <input
                type="password"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
              />
            </div>

            <div className="findpassword-button-row">
              <span className="findpassword-btn-confirm" onClick={handleResetPassword}>Reset</span>
              <span className="findpassword-divider">|</span>
              <span className="findpassword-btn-cancel" onClick={() => setStep(1)}>Cancel</span>
            </div>
          </>
        )}
        <div className="findpassword-link-row">
            Forgot your ID?
            <a href="/find-id">Find ID</a>
        </div>
      </div>
    </div>
  );
};

export default FindPassword;
