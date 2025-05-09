import axios from 'axios';
import { validateNameFormat} from './validation';
import { useNavigate } from 'react-router-dom';

export function useSignUpSubmit({
  id, idChecked, idAvailable,
  nickname, nicknameChecked, nicknameAvailable,
  name, password, confirmPassword,
  email, emailChecked, emailAvailable, emailVerified,
  tel1, tel2, tel3
}) {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isAnyTelInput = tel1 || tel2 || tel3;    

    if (!idChecked || !idAvailable) return alert("아이디 중복확인을 해주세요.");
    if (!nicknameChecked || !nicknameAvailable) return alert("닉네임 중복확인을 해주세요.");

    const { valid: nameValid, message: nameMessage } = validateNameFormat(name);
    if (!nameValid) return alert(nameMessage);

    if (password.length < 6) return alert("비밀번호는 최소 6자 이상이어야 합니다.");
    if (password !== confirmPassword) return alert("비밀번호가 일치하지 않습니다.");

    if (!emailChecked || !emailAvailable) return alert("이메일 인증을 해주세요.");
    if (!emailVerified) return alert("이메일 인증을 완료해주세요.");

    if (isAnyTelInput) {
      // 1) 3칸 모두 입력됐는지 확인
      if (!tel1 || !tel2 || !tel3) {
        alert("전화번호 입력이 불완전합니다. 3칸 모두 입력해주세요.");
        return;
      }

      // 2) 길이 확인 (예: 3-4-4)
      if (tel1.length !== 3 || tel2.length !== 4 || tel3.length !== 4) {
        alert("전화번호 형식이 올바르지 않습니다. 예: 010-1234-5678");
        return;
      }

      // 3) 숫자만 입력됐는지 확인 (선택)
      const phoneRegex = /^\d+$/;
      if (
        !phoneRegex.test(tel1) ||
        !phoneRegex.test(tel2) ||
        !phoneRegex.test(tel3)
      ) {
        alert("전화번호는 숫자만 입력 가능합니다.");
        return;
      }
    }
    
    try {
      const dto = {
        id,
        nickname,
        name,
        pwd: password,
        email,
        tel: tel1 && tel2 && tel3 ? `${tel1}-${tel2}-${tel3}` : null,
      };

      await axios.post("http://localhost:9090/sign-up", dto);
      alert("회원가입 성공!");
      navigate('/sign-in');
    } catch (err) {
      alert("회원가입 중 오류가 발생했습니다.");
      console.error(err);
    }
  };

  return { handleSubmit };
}
