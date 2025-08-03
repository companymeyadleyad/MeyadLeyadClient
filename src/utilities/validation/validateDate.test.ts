// validateDate.test.js
const { validateDate } = require("./validateDate");

const testCasesDate = [
  {
    date: "2024-02-29",
    expected: true,
    description: "תאריך חוקי - 29 בפברואר בשנה מעוברת",
  },
  {
    date: "2024-02-28",
    expected: true,
    description: "תאריך חוקי - 28 בפברואר בשנה מעוברת",
  },
  {
    date: "2023-02-29",
    expected: false,
    description: "תאריך לא חוקי - 29 בפברואר בשנה לא מעוברת",
  },
  {
    date: "2023-04-31",
    expected: false,
    description: "תאריך לא חוקי - 31 באפריל (לא קיים)",
  },
  {
    date: "2023-06-31",
    expected: false,
    description: "תאריך לא חוקי - 31 ביוני (לא קיים)",
  },
  {
    date: "2023-12-32",
    expected: false,
    description: "תאריך לא חוקי - 32 בדצמבר (לא קיים)",
  },
  { date: "2024-01-01", expected: true, description: "תאריך חוקי - 1 בינואר" },
  {
    date: "2020-02-29",
    expected: true,
    description: "תאריך חוקי - 29 בפברואר בשנה מעוברת",
  },
  { date: "2020-04-30", expected: true, description: "תאריך חוקי - 30 באפריל" },
  {
    date: "2023-13-01",
    expected: false,
    description: "תאריך לא חוקי - חודש 13 לא קיים",
  },
  {
    date: "2023-00-10",
    expected: false,
    description: "תאריך לא חוקי - חודש 0 לא קיים",
  },
  {
    date: "abcd-ef-gh",
    expected: false,
    description: "תאריך לא חוקי - פורמט לא תקני",
  },
  { date: "2023-06-15", expected: true, description: "תאריך חוקי - 15 ביוני" },
];

testCasesDate.forEach((test) => {
  const result = validateDate(test.date);
  console.log(`בדיקה: ${test.description}`);
  console.log(`תוצאה מצופה: ${test.expected}`);
  console.log(`תוצאה שהתקבלה: ${result}`);
  console.log(`תוצאה נכונה: ${result === test.expected ? "כן" : "לא"}\n`);
});

export {};
