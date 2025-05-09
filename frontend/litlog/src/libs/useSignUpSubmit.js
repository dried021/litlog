import axios from 'axios';
import { validateNameFormat} from './validation';

export function useSignUpSubmit({
  id, idChecked, idAvailable,
  nickname, nicknameChecked, nicknameAvailable,
  name, password, confirmPassword,
  email, emailChecked, emailAvailable, emailVerified,
  tel1, tel2, tel3
}) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idChecked || !idAvailable) return alert("아이디 중복확인을 해주세요.");
    if (!nicknameChecked || !nicknameAvailable) return alert("닉네임 중복확인을 해주세요.");

    const { valid: nameValid, message: nameMessage } = validateNameFormat(name);
    if (!nameValid) return alert(nameMessage);

    if (password.length < 6) return alert("비밀번호는 최소 6자 이상이어야 합니다.");
    if (password !== confirmPassword) return alert("비밀번호가 일치하지 않습니다.");

    if (!emailChecked || !emailAvailable) return alert("이메일 인증을 해주세요.");
    if (!emailVerified) return alert("이메일 인증을 완료해주세요.");

    try {
      const dto = {
        id,
        nickname,
        name,
        pwd: password,
        email,
        tel: tel1 && tel2 && tel3 ? `${tel1}-${tel2}-${tel3}` : null,
      };

      await axios.post("http://localhost:9090/sign-up/sign-up", dto);
      alert("회원가입 성공!");
    } catch (err) {
      alert("회원가입 중 오류가 발생했습니다.");
      console.error(err);
    }
  };

  return { handleSubmit };
}
