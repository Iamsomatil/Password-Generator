const UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz";
const NUMBER_CHARS = "0123456789";
const SYMBOL_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

export const generatePassword = (options) => {
  let chars = "";
  if (options.includeUppercase) chars += UPPERCASE_CHARS;
  if (options.includeLowercase) chars += LOWERCASE_CHARS;
  if (options.includeNumbers) chars += NUMBER_CHARS;
  if (options.includeSymbols) chars += SYMBOL_CHARS;

  if (chars === "") return "";

  let password = "";
  const array = new Uint32Array(options.length);
  crypto.getRandomValues(array);

  for (let i = 0; i < options.length; i++) {
    password += chars[array[i] % chars.length];
  }

  return password;
};
