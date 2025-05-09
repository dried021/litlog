import { useState } from 'react';
import axios from 'axios';
import { nicknameUtils } from './validation_nickname';

export function useSignUpHandlers_nickname() {
    const [nickname, setNickname] = useState('');
    const [nicknameChecked, setNicknameChecked] = useState(false);
    const [nicknameAvailable, setNicknameAvailable] = useState(null);

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
  