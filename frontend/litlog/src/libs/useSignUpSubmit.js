import axios from 'axios';
import { validateNameFormat} from './validation';
import { useNavigate } from 'react-router-dom';

export function useSignUpSubmit({
  id, idChecked, idAvailable,
  nickname, nicknameChecked, nicknameAvailable,
  name, password, confirmPassword,
  email, emailChecked, emailAvailable, emailVerified,
  tel1, tel2, tel3, openModal
}) {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isAnyTelInput = tel1 || tel2 || tel3;    

    if (!idChecked || !idAvailable) return openModal("Please check for duplicate ID.");
    if (!nicknameChecked || !nicknameAvailable) return openModal("Please check for duplicate nickname.");

    const { valid: nameValid, message: nameMessage } = validateNameFormat(name);
    if (!nameValid) return alert(nameMessage);

    if (password.length < 6) return openModal("Password must be at least 6 characters long.");
    if (password !== confirmPassword) return openModal("Passwords do not match.");

    if (!emailChecked || !emailAvailable) return openModal("Please verify your email.");
    if (!emailVerified) return openModal("Please complete email verification.");

    if (isAnyTelInput) {
      if (!tel1 || !tel2 || !tel3) {
        openModal("Incomplete phone number. Please fill in all 3 fields.");
        return;
      }

      if (tel1.length !== 3 || tel2.length !== 4 || tel3.length !== 4) {
        openModal("Invalid phone number format. Example: 010-1234-5678");
        return;
      }

      const phoneRegex = /^\d+$/;
      if (
        !phoneRegex.test(tel1) ||
        !phoneRegex.test(tel2) ||
        !phoneRegex.test(tel3)
      ) {
        openModal("Phone number must contain digits only.");
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
      openModal("Sign-up successful!");
      navigate('/sign-in');
    } catch (err) {
      openModal("An error occurred during sign-up.");
      console.error(err);
    }
  };

  return { handleSubmit };
}
