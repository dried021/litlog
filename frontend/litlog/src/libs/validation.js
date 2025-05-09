export function idUtils(id) { // 아이디 유효성 검사
    const trimmed = id.trim();
  
    if (trimmed.length < 4) {
      return { valid: false, message: "아이디는 최소 4자 이상이어야 합니다." };
    }
  
    if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
      return { valid: false, message: "아이디는 영문, 숫자, 언더스코어(_)만 사용 가능합니다." };
    }
  
    return { valid: true };
  }

  export function nicknameUtils(nickname) { // 닉네임 유효성 검사
    const trimmed = nickname.trim();
  
    if (trimmed.length < 2) {
      return { valid: false, message: "닉네임은 최소 2자 이상이어야 합니다." };
    }
  
    if (!/^[a-zA-Z0-9가-힣_]+$/.test(trimmed)) {
      return { valid: false, message: "닉네임은 한글, 영문, 숫자, 언더스코어만 사용 가능합니다." };
    }
  
    return { valid: true };
  }

  export function validateNameFormat(name) { // 이름 유효성 검사  
  const trimmed = name.trim();

  if (trimmed.length < 2) {
    return { valid: false, message: "이름은 최소 2자 이상이어야 합니다." };
  }

  if (!/^[가-힣a-zA-Z]+$/.test(trimmed)) {
    return { valid: false, message: "이름은 한글 또는 영문만 입력 가능합니다." };
  }

  return { valid: true };
}

export function validateEmailFormat(email) { // 이메일 유효성 검사
  const trimmed = email.trim();

  if (!/\S+@\S+\.\S+/.test(trimmed)) return { valid: false, message: "유효한 이메일 형식이 아닙니다." };
  
  return { valid: true };
}
