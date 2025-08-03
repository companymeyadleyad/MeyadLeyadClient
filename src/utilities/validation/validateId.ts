// validateId.js

/**
 * פונקציה שבודקת אם תז חוקי
 * @param {string} id - תעודת זהות לבדיקה
 * @returns {boolean} - אם תעודת הזהות חוקית
 */
export function validateId(id: string): boolean {
    // אם תעודת הזהות לא בת 9 ספרות
    if (id.length !== 9) return false;
    
    // אם תעודת הזהות כוללת אפסים בלבד
    if (id === '000000000') return false;
    
    // המרה למערך של ספרות
    const digits = id.split('').map(Number);
    
    // חישוב על פי אלגוריתם התעודה (כפול כל ספרה באי זוגית ומחסירים אותה מהתוצאה)
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        let digit = digits[i];
        if (i % 2 === 0) {
            sum += digit;  // ספרות במיקומים אי זוגיים (מתחילים מ-0)
        } else {
            digit *= 2;
            if (digit > 9) digit -= 9;  // אם התוצאה יותר מ-9, חיסור 9
            sum += digit;
        }
    }
    
    // אם הסכום חלקי 10, התעודה חוקית
    return sum % 10 === 0;
}

