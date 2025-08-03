// validateEmail.test.js
// import { validateEmail } from './validateEmail';
const { validateEmail } = require("./validateEmail");

export {};

const testCasesEmail = [
  { email: "test@example.com", expected: true, description: "מייל חוקי" },
  {
    email: "invalid-email",
    expected: false,
    description: "מייל לא חוקי (פורמט לא תקין)",
  },
  {
    email: "user@domain",
    expected: false,
    description: "מייל לא חוקי (חסר סיומת)",
  },
  {
    email: "user@domain.",
    expected: false,
    description: "מייל לא חוקי (סיומת לא תקינה)",
  },
  {
    email: "user@.com",
    expected: false,
    description: "מייל לא חוקי (חסר שם תחום)",
  },
  {
    email: "user@domain.c",
    expected: false,
    description: "מייל לא חוקי (סיומת קצרה מדי)",
  },
  { email: "user@domain.com", expected: true, description: "מייל חוקי" },
  {
    email: "user_name@domain.com",
    expected: true,
    description: "מייל חוקי עם תו תחתון",
  },
  {
    email: "user-name@domain.com",
    expected: true,
    description: "מייל חוקי עם מקף",
  },
  {
    email: "user@subdomain.domain.com",
    expected: true,
    description: "מייל חוקי עם תת-דומיין",
  },
  {
    email: "user@domain.corporation",
    expected: true,
    description: "מייל חוקי עם סיומת ארוכה",
  },
];

testCasesEmail.forEach((test) => {
  const result = validateEmail(test.email);
  console.log(`בדיקה: ${test.description}`);
  console.log(`תוצאה מצופה: ${test.expected}`);
  console.log(`תוצאה שהתקבלה: ${result}`);
  console.log(`תוצאה נכונה: ${result === test.expected ? "כן" : "לא"}\n`);
});
