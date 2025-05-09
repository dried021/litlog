import { useState } from 'react';
import axios from 'axios';
import { validateIdFormat, validateNameFormat, validateEmailFormat } from './validation';

export function useSignUpHandlers_id() { // 아이디 중복 확인 및 유효성 검사
  const [id, setId] = useState('');
  const [idChecked, setIdChecked] = useState(false);
  const [idAvailable, setIdAvailable] = useState(null);

  const handleIdChange = (e) => {
    setId(e.target.value);
    setIdChecked(false);
    setIdAvailable(null);
  };

  const checkIdDuplicate = async () => {
    const { valid, message } = validateIdFormat(id);
    if (!valid) {
      alert(message);
      return;
    }
 
    try {
      const res = await axios.post('http://localhost:9090/sign-up/check-id', { id });
      if (res.data.available) {
        alert('사용 가능한 아이디입니다.');
        setIdAvailable(true);
      } else {
        alert('이미 사용 중인 아이디입니다.');
        setIdAvailable(false);
      }
      setIdChecked(true);
    } catch (err) {
      alert('서버 오류: 중복 확인 실패');
      console.error(err);
    }
  };
  return {
    id,
    idChecked,
    idAvailable,
    handleIdChange,
    checkIdDuplicate
  };
}

export function useSignUpHandlers_nickname() { // 닉네임 중복 확인 및 유효성 검사
    // 닉네임 상태 관리
    const [nickname, setNickname] = useState(''); // 닉네임 상태
    const [nicknameChecked, setNicknameChecked] = useState(false); // 닉네임 중복 확인 여부
    const [nicknameAvailable, setNicknameAvailable] = useState(null); // 닉네임 사용 가능 여부

    const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setNicknameChecked(false);
    setNicknameAvailable(null);
    };

    const checkNicknameDuplicate = async () => {
    const { valid, message } = validateNameFormat(nickname);
    if (!valid) {
        alert(message);
        return;
    }
 
    try {
        const res = await axios.post('http://localhost:9090/sign-up/check-nickname', { nickname });
        if (res.data.available) {
        alert('사용 가능한 닉네임입니다.');
        setNicknameAvailable(true);
        } else {
        alert('이미 사용 중인 닉네임입니다.');
        setNicknameAvailable(false);
        }
        setNicknameChecked(true);
    } catch (err) {
        alert('서버 오류: 닉네임 확인 실패');
        console.error(err);
    }
    };
    return {
        nickname,
        nicknameChecked,
        nicknameAvailable,
        handleNicknameChange,
        checkNicknameDuplicate
      };
  }

  export function useSignUpHandlers_email() {
  const [email, setEmail] = useState('');
  const [emailChecked, setEmailChecked] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false); // 인증 확인 여부
  const [emailCode, setEmailCode] = useState('');             // 입력한 인증 코드

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailChecked(false);
    setEmailAvailable(null);
    setEmailVerified(false);
  };

  const checkEmailDuplicate = async () => {
    const { valid, message } = validateEmailFormat(email);
    if (!valid) {
      alert(message);
      return;
    }

    try {
      const res = await axios.post('http://localhost:9090/sign-up/check-email', { email });
      if (res.data.available) {
        // 이메일 사용 가능하므로 인증코드 보내기
        await axios.post('http://localhost:9090/sign-up/send-code', { email }, { withCredentials: true });
        alert('인증코드가 이메일로 전송되었습니다.');
        setEmailAvailable(true);
      } else {
        alert('이미 사용 중인 이메일입니다.');
        setEmailAvailable(false);
      }
      setEmailChecked(true);
    } catch (err) {
      alert('서버 오류: 이메일 중복 확인 실패');
      console.error(err);
    }
  };

  const verifyEmailCode = async () => {
    try {
      const res = await axios.post('http://localhost:9090/sign-up/verify-email', { code: emailCode }, { withCredentials: true });
      if (res.data.verified) {
        alert('이메일 인증 완료!');
        setEmailVerified(true);
      } else {
        alert('인증코드가 틀렸습니다.');
        setEmailVerified(false);
      }
    } catch (err) {
      alert('서버 오류: 인증 실패');
      console.error(err);
    }
  };

  return {
    email,
    emailCode,
    emailChecked,
    emailAvailable,
    emailVerified,
    setEmailCode,
    handleEmailChange,
    checkEmailDuplicate,
    verifyEmailCode
  };
}