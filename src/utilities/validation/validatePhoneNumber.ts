// validatePhoneNumber.js

/**
 * פונקציה שבודקת אם מספר טלפון חוקי
 * @param {string} phoneNumber - מספר טלפון לבדיקה
 * @returns {boolean} - אם מספר הטלפון חוקי
 */
export function validatePhoneNumber(phoneNumber: string): boolean {
    // ביטוי רגולרי לבדיקת פורמט מספר טלפון
    const phoneRegex = /^(?:\+972|0)(?:[2-9][0-9]{1,2})[0-9]{6}$/;
    return phoneRegex.test(phoneNumber);
}
