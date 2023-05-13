type CheckPasswordStrength = (password: string) => string | undefined;

export const checkPasswordStrength: CheckPasswordStrength = (password: string) => {
  const pattern = {
    digit: /\d/,
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
  };

  if (password.length >= 8) {
    if (!pattern.digit.test(password)) {
      return "Password must contain at least one digit";
    }

    if (!pattern.uppercase.test(password)) {
      return "Password must contain at least one uppercase letter";
    }

    if (!pattern.lowercase.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
  } else {
    return "Password must be at least 8 characters long";
  }

  return;
};
