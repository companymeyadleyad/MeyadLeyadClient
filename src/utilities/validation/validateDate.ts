// validateDate.js

/**
 * פונקציה שבודקת אם התאריך חוקי
 * @param {string} date - תאריך במבנה yyyy-mm-dd
 * @returns {boolean} - אם התאריך חוקי
 */
export function validateDate(date: string): boolean {
    // מבנה תאריך חוקי: yyyy-mm-dd
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    
    // אם התאריך לא תואם למבנה, מחזירים false
    if (!dateRegex.test(date)) {
        return false;
    }

    // מפרקים את התאריך לשנה, חודש ויום
    const [year, month, day] = date.split('-').map(Number);

    // בודקים אם החודש תקין (1-12)
    if (month < 1 || month > 12) {
        return false;
    }

    // מספר הימים בכל חודש
    const daysInMonth = [31, (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // בודקים אם היום בתאריך תקין עבור החודש
    if (day < 1 || day > daysInMonth[month - 1]) {
        return false;
    }

    return true;
}
