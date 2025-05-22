import { useEffect, useState } from 'react';
import axios from 'axios';
import { validateIdFormat, validateNicknameFormat, validateEmailFormat } from './validation';

export function useSignUpHandlers_id(openModal) { 
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
      openModal(message);
      return;
    }
 
    try {
      const res = await axios.post('http://localhost:9090/sign-up/check-id', { id });
      if (res.data.available) {
        openModal('This ID is available.');
        setIdAvailable(true);
      } else {
        openModal('This ID is already taken.');
        setIdAvailable(false);
      }
      setIdChecked(true);
    } catch (err) {
      openModal('Server error: Failed to check ID.');
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

export function useSignUpHandlers_nickname(openModal) { 
    const [nickname, setNickname] = useState(''); 
    const [nicknameChecked, setNicknameChecked] = useState(false); 
    const [nicknameAvailable, setNicknameAvailable] = useState(null); 

    const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setNicknameChecked(false);
    setNicknameAvailable(null);
    };

    const checkNicknameDuplicate = async () => {
    const { valid, message } = validateNicknameFormat(nickname);
    if (!valid) {
      openModal(message);
        return;
    }
 
    try {
        const res = await axios.post('http://localhost:9090/sign-up/check-nickname', { nickname });
        if (res.data.available) {
          openModal('This nickname is available.');
        setNicknameAvailable(true);
        } else {
          openModal('This nickname is already taken.');
        setNicknameAvailable(false);
        }
        setNicknameChecked(true);
    } catch (err) {
      openModal('Server error: Failed to check nickname.');
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

  export function useSignUpHandlers_email(openModal) {
  const [email, setEmail] = useState('');
  const [emailChecked, setEmailChecked] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false); 
  const [emailCode, setEmailCode] = useState('');             

  const [timeLeft, setTimeLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailChecked(false);
    setEmailAvailable(null);
    setEmailVerified(false);
    setTimerRunning(false);         
    setTimeLeft(0);                 
  };


  const sendEmailCode = async () => {
    const { valid, message } = validateEmailFormat(email);
    if (!valid) return openModal(message);

    try {
      const res = await axios.post('http://localhost:9090/sign-up/check-email', { email });
      if (!res.data.available) {
        openModal("This email is already in use.");
        setEmailAvailable(false);
        return;
      }

      await axios.post('http://localhost:9090/sign-up/send-code', { email }, { withCredentials: true });
      openModal("Verification code has been sent to your email.");

      setEmailAvailable(true);
      setEmailChecked(true);
      setTimeLeft(180); // 3분
      setTimerRunning(true);
    } catch (err) {
      openModal("Failed to send verification code.");
      console.error(err);
    }
  };

  const verifyEmailCode = async () => {
    if (!timerRunning && timeLeft === 0) {
      openModal('The verification time has expired. Please try again.');
      setEmailVerified(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:9090/sign-up/verify-email', { code: emailCode }, { withCredentials: true });
      if (res.data.verified) {
        openModal('Email verified successfully!');
        setEmailVerified(true);
        setTimerRunning(false);  
        setTimeLeft(0);      
      } else {
        openModal('Incorrect verification code.');
        setEmailVerified(false);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        openModal("Invalid verification code.");
      } else {
        openModal('Server error: Email verification failed.');
        console.error(err);
      }
    }
  };


  useEffect(() => {
    if (!timerRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimerRunning(false);
          //openModal("Verification time has expired.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerRunning]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  return {
    email,
    emailCode,
    emailChecked,
    emailAvailable,
    emailVerified,
    timeLeft,
    timerRunning,
    formatTime,
    setEmailCode,
    handleEmailChange,
    sendEmailCode,
    verifyEmailCode
  };
}