export function idUtils(id) {
    const trimmed = id.trim();
  
    if (trimmed.length < 4) {
      return { valid: false, message: "아이디는 최소 4자 이상이어야 합니다." };
    }
  
    if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
      return { valid: false, message: "아이디는 영문, 숫자, 언더스코어(_)만 사용 가능합니다." };
    }
  
    return { valid: true };
  }
  