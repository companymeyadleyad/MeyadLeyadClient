// validateId.test.js
const { validateId } = require("./validateId");

const testCasesId = [
  { id: "123456789", expected: false, description: "תעודת זהות לא חוקית" },
  { id: "123456782", expected: true, description: "תעודת זהות חוקית" },
  {
    id: "000000000",
    expected: false,
    description: "תעודת זהות לא חוקית (מספרים אפסים)",
  },
  {
    id: "987654320",
    expected: false,
    description: "תעודת זהות לא חוקית (הסכום לא מתחלק ב-10)",
  },
  { id: "111111112", expected: false, description: "תעודת זהות חוקית" },
  {
    id: "1234",
    expected: false,
    description: "תעודת זהות לא חוקית (אורך לא נכון)",
  },
  {
    id: "9876543210",
    expected: false,
    description: "תעודת זהות לא חוקית (אורך לא נכון)",
  },
  { id: "555555555", expected: false, description: "תעודת זהות לא חוקית" },
];

testCasesId.forEach((test) => {
  const result = validateId(test.id);
  console.log(`בדיקה: ${test.description}`);
  console.log(`תוצאה מצופה: ${test.expected}`);
  console.log(`תוצאה שהתקבלה: ${result}`);
  console.log(`תוצאה נכונה: ${result === test.expected ? "כן" : "לא"}\n`);
});

export {};
