// validatePhoneNumber.test.js
const { validatePhoneNumber } = require("./validatePhoneNumber");

const testCases = [
  {
    phoneNumber: "+972524567890",
    expected: true,
    description: "מספר טלפון חוקי עם קידומת +972",
  },
  {
    phoneNumber: "0524567890",
    expected: true,
    description: "מספר טלפון חוקי עם קידומת 0",
  },
  {
    phoneNumber: "0531234567",
    expected: true,
    description: "מספר טלפון חוקי עם קידומת 0",
  },
  {
    phoneNumber: "+972542345678",
    expected: true,
    description: "מספר טלפון חוקי עם קידומת +972",
  },
  {
    phoneNumber: "05234567890",
    expected: false,
    description: "מספר טלפון לא חוקי (יותר מדי ספרות)",
  },
  {
    phoneNumber: "054-3456789",
    expected: false,
    description: "מספר טלפון לא חוקי (כולל תו לא חוקי - מקף)",
  },
  {
    phoneNumber: "123456789",
    expected: false,
    description: "מספר טלפון לא חוקי (התחלה לא חוקית)",
  },
  {
    phoneNumber: "0",
    expected: false,
    description: "מספר טלפון לא חוקי (אורך לא תקני)",
  },
  {
    phoneNumber: "+123456789",
    expected: false,
    description: "מספר טלפון לא חוקי (קידומת לא נכונה)",
  },
  {
    phoneNumber: "0524567a90",
    expected: false,
    description: "מספר טלפון לא חוקי (כולל תו לא חוקי - אות)",
  },
  {
    phoneNumber: "+9723456789",
    expected: false,
    description: "מספר טלפון לא חוקי (קידומת לא חוקית)",
  },
];

testCases.forEach((test) => {
  const result = validatePhoneNumber(test.phoneNumber);
  console.log(`בדיקה: ${test.description}`);
  console.log(`תוצאה מצופה: ${test.expected}`);
  console.log(`תוצאה שהתקבלה: ${result}`);
  console.log(`תוצאה נכונה: ${result === test.expected ? "כן" : "לא"}\n`);
});

export {};
