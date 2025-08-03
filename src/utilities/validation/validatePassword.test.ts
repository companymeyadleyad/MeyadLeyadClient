// validatePassword.test.js
const { validatePassword } = require("./validatePassword");

const testCasesPassword = [
  { password: "Password1!", expected: true, description: "סיסמה חוקית" },
  {
    password: "password1!",
    expected: false,
    description: "סיסמה לא חוקית (לא כוללת אות רישית)",
  },
  {
    password: "PASSWORD1!",
    expected: false,
    description: "סיסמה לא חוקית (לא כוללת תו מיוחד)",
  },
  {
    password: "Passw!1",
    expected: false,
    description: "סיסמה לא חוקית (קצרה מדי)",
  },
  {
    password: "password!",
    expected: false,
    description: "סיסמה לא חוקית (חסרה מספר)",
  },
  {
    password: "P@sswrd",
    expected: false,
    description: "סיסמה לא חוקית (חסרה מספר)",
  },
  {
    password: "Pass1234",
    expected: false,
    description: "סיסמה לא חוקית (חסרה תו מיוחד)",
  },
  { password: "P@ssword123", expected: true, description: "סיסמה חוקית" },
  {
    password: "12345678",
    expected: false,
    description: "סיסמה לא חוקית (חסרה אות רישית ותו מיוחד)",
  },
  { password: "abcABC123!", expected: true, description: "סיסמה חוקית" },
];

testCasesPassword.forEach((test) => {
  const result = validatePassword(test.password);
  console.log(`בדיקה: ${test.description}`);
  console.log(`תוצאה מצופה: ${test.expected}`);
  console.log(`תוצאה שהתקבלה: ${result}`);
  console.log(`תוצאה נכונה: ${result === test.expected ? "כן" : "לא"}\n`);
});

export {};
