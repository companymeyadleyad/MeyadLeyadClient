// validatePassword.js

/**
 * פונקציה שבודקת אם הסיסמה עומדת בדרישות מינימליות
 * @param {string} password - הסיסמה לבדיקה
 * @returns {boolean} - אם הסיסמה תקינה
 */
export function validatePassword(password: string): boolean {
    // ביטוי רגולרי לבדיקת סיסמה עם דרישות מינימליות
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}
