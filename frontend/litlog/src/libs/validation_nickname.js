// utils/validation.js

export function nicknameUtils(nickname) {
    const trimmed = nickname.trim();
  
    if (trimmed.length < 2) {
      return { valid: false, message: "닉네임은 최소 2자 이상이어야 합니다." };
    }
  
    if (!/^[a-zA-Z0-9가-힣_]+$/.test(trimmed)) {
      return { valid: false, message: "닉네임은 한글, 영문, 숫자, 언더스코어만 사용 가능합니다." };
    }
  
    return { valid: true };
  }
  