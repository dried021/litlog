export function validateIdFormat(id) {
  const trimmed = id.trim();

  if (trimmed.length < 4) {
    return { valid: false, message: "ID must be at least 4 characters long." };
  }

  if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
    return { valid: false, message: "ID can only contain letters, numbers, and underscores (_)." };
  }

  // 영어 + 숫자
  if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(trimmed)) {
    return { valid: false, message: "ID must contain both letters and numbers." };
  }

  return { valid: true };
}

  export function validateNicknameFormat(nickname) { 
    const trimmed = nickname.trim();
  
    if (trimmed.length < 2) {
      return { valid: false, message: "Nickname must be at least 2 characters long." };
    }
  
    if (!/^[a-zA-Z0-9가-힣_]+$/.test(trimmed)) {
      return { valid: false, message: "Nickname can only contain Korean characters, letters, numbers, and underscores (_)." };
    }
  
    return { valid: true };
  }

  export function validatePassword(password) {
    const trimmed = password.trim();

    if (trimmed.length < 6) {
      return { valid: false, message: "Password must be at least 6 characters long." };
    }

    if (!/(?=.*[A-Za-z])(?=.*\d)/.test(trimmed)) {
      return { valid: false, message: "Password must contain both letters and numbers." };
    }

    return { valid: true };
  }

  export function validateNameFormat(name) { 
  const trimmed = name.trim();

  if (trimmed.length < 2) {
    return { valid: false, message: "Name must be at least 2 characters long." };
  }

  if (!/^[가-힣a-zA-Z]+$/.test(trimmed)) {
    return { valid: false, message: "Name can only contain Korean or English letters." };
  }

  return { valid: true };
}

export function validateEmailFormat(email) { 
  const trimmed = email.trim();

  if (!/\S+@\S+\.\S+/.test(trimmed)) 
    return { valid: false, message: "Please enter a valid email address." };

  return { valid: true };
}
