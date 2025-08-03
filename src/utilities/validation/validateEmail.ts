/**
 * פונקציה שבודקת אם כתובת מייל חוקית
 * @param {string} email - כתובת מייל לבדיקה
 * @returns {boolean} - אם כתובת המייל חוקית
 */
export default function validateEmail(email: string): boolean {
    // ביטוי רגולרי לבדיקת מבנה המייל עם סיומת של לפחות 2 תווים ומקסימום 20 תווים
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/;
    return emailRegex.test(email);
}
