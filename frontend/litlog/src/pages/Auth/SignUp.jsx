import React, { useState } from 'react';
import { useSignUpHandlers_id, useSignUpHandlers_nickname, useSignUpHandlers_email } from '../../libs/useSignUpHandlers.js';
import '../../styles/SignUp.css';
import { useSignUpSubmit } from '../../libs/useSignUpSubmit';

function SignUp() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [tel1, setTel1] = useState('');
  const [tel2, setTel2] = useState('');
  const [tel3, setTel3] = useState('');
  
  
  const {
    id,
    idChecked,
    idAvailable,
    handleIdChange,
    checkIdDuplicate
  } = useSignUpHandlers_id();

  const {
    nickname,
    nicknameChecked,
    nicknameAvailable,
    handleNicknameChange,
    checkNicknameDuplicate
  } = useSignUpHandlers_nickname();

  const {
    email,
    emailCode,
    emailChecked,
    emailAvailable,
    emailVerified,         
    handleEmailChange,
    checkEmailDuplicate,
    setEmailCode,
    verifyEmailCode
  } = useSignUpHandlers_email();

  const { handleSubmit } = useSignUpSubmit({
    id, idChecked, idAvailable,
    nickname, nicknameChecked, nicknameAvailable,
    name, password, confirmPassword,
    email,
    emailVerified,     
    emailAvailable,   
    emailChecked,
    tel1, tel2, tel3
  });


    return (
        <div className="signup-wrapper">
        <h2>CREATE ACCOUNT</h2>

        <div className="signup-box">
            <form className="signup-form" onSubmit={handleSubmit}>
              <div className="form-group">
              <label>ID</label>
              <input type="text" name="id" value={id} onChange={handleIdChange} />
              <button type="button" onClick={checkIdDuplicate}>중복확인</button>
              {idAvailable === true && <span className="valid">✔ 사용 가능</span>}
              {idAvailable === false && <span className="invalid">✖ 중복 아이디</span>}
              </div>

              <div className="form-group">
                <label>Nickname</label>
                <input
                  type="text"
                  name="nickname"
                  value={nickname}
                  onChange={handleNicknameChange}
                />
                <button type="button" onClick={checkNicknameDuplicate}>중복확인</button>
                {nicknameAvailable === true && <span className="valid">✔ 사용 가능</span>}
                {nicknameAvailable === false && <span className="invalid">✖ 중복 닉네임</span>}
              </div>
      
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
      
              <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
      
              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
      
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={email} onChange={handleEmailChange} />
                <button type="button" onClick={checkEmailDuplicate}>인증하기</button>
                {emailAvailable === true && <span className="valid">✔ 인증코드 전송됨</span>}
                {emailAvailable === false && <span className="invalid">✖ 이미 사용 중</span>}
              </div>

              {emailAvailable && (
                <div className="form-group">
                  <label>인증코드 입력</label>
                  <input
                    type="text"
                    value={emailCode}
                    onChange={(e) => setEmailCode(e.target.value)}
                  />
                  <button type="button" onClick={verifyEmailCode}>인증 확인</button>
                  {emailVerified && <span className="valid">✔ 인증 완료</span>}
                </div>
              )}


              <div className="form-group">
                <label>Phone</label>
                <div className="phone-inputs">
                    <input type="text" name="tel1" value={tel1} onChange={(e) => setTel1(e.target.value)} maxLength="3" />
                    <span>-</span>
                    <input type="text" name="tel2" value={tel2} onChange={(e) => setTel2(e.target.value)} maxLength="4" />
                    <span>-</span>
                    <input type="text" name="tel3" value={tel3} onChange={(e) => setTel3(e.target.value)} maxLength="4" />
                </div>
              </div>

              <button type="submit">Sign Up</button>
            </form>
        </div>

        <div className="form-footer">
            Already have an account? <a href="/login">Sign In</a>
        </div>
        <div>
            <a href="/">HOME</a>
        </div>
        </div>
    );
  }
  
  export default SignUp; 