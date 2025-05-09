import { useState } from 'react';
import axios from 'axios';
import { idUtils } from './validation_id';

export function useSignUpHandlers_id() {
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
