import { useState } from 'react';
import axios from 'axios';
import { idUtils, nicknameUtils } from './validation';

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
    const { valid, message } = idUtils(id);
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
    const { valid, message } = nicknameUtils(nickname);
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