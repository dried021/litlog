import React from 'react';
import { useSignUpHandlers_id } from '../../libs/useSignUpHandlers_id.js';
import { useSignUpHandlers_nickname } from '../../libs/useSignUpHandlers_nickname.js';
import '../../styles/SignUp.css';


const SignUp = () => {
  const {
    id,
    // idChecked,
    idAvailable,
    handleIdChange,
    checkIdDuplicate
  } = useSignUpHandlers_id();

  const {
    nickname,
    //nicknameChecked,
    nicknameAvailable,
    handleNicknameChange,
    checkNicknameDuplicate
  } = useSignUpHandlers_nickname();

    return (
        <div className="signup-wrapper">
        <h2>CREATE ACCOUNT</h2>

        <div className="signup-box">
            <form className="signup-form">
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
            <input type="text" name="name" />
          </div>
  
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" />
          </div>
  
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" />
          </div>
  
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" />
            <button type="button">인증하기</button>
          </div>

          <div className="form-group">
            <label>Phone</label>
            <div className="phone-inputs">
                <input type="text" name="tel1" maxLength="3" />
                <span>-</span>
                <input type="text" name="tel2" maxLength="4" />
                <span>-</span>
                <input type="text" name="tel3" maxLength="4" />
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