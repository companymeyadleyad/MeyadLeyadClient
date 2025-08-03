// טיפוס שמתאר את הוולידציות
export interface Validation {
  type: "required" | "minLength" | "email" | "pattern" | "password" | "match"; // סוג הוולידציה
  value?: number | string | boolean; // ערך לוולידציה, כמו minLength או pattern
  field?: string; // עבור ולידציה מסוג 'match' (כדי להשוות לשדה אחר)
  message: string; // הודעת שגיאה אם הוולידציה נכשלת
}

// טיפוס שמתאר את האפשרויות של שדה מסוג dropdown
export interface Option {
  label: string; // תווית שמופיעה ב-dropdown
  value: string | number; // הערך שנשלח כשנבחרה האופציה
}

// טיפוס שמייצג שדה ב-form
export interface FormField {
  name: string; // שם השדה
  label: string; // תווית השדה
  type:
    | "text"
    | "email"
    | "dropdown"
    | "checkbox"
    | "select"
    | "password"
    | "tel"
    | "match"
    | "autocomplete"
    | "listgroup"; // סוג השדה
  placeholder?: string; // טקסט מלווה לשדה (אופציונלי)
  validations: Validation[]; // רשימת וולידציות לשדה
  options?: Option[]; // אופציות אם מדובר ב-dropdown (אופציונלי)
  searchEndpoint?: string; // נקודת קצה לחיפוש אם מדובר בשדה אוטוקומפליט (אופציונלי)
  minChars?: number; // מספר תווים מינימלי לפני תחילת החיפוש (אופציונלי)
  debounceMs?: number; // זמן המתנה בין חיפושים במילישניות (אופציונלי)
  onItemClick?: (value: string | number) => void; // פונקציה שתתבצע בלחיצה על פריט ב-ListGroup (אופציונלי)
}

// טיפוס שמתאר כפתור בפורם
export interface FormButton {
  type: "submit" | "button" | "reset"; // סוג הכפתור
  label: string; // טקסט שמופיע על הכפתור
  className?: string; // מחלקות CSS אופציונליות
  onClick?: "handleReset" | string; // פעולה שתתבצע בלחיצה
}

// עדכון המבנה של הקונפיגורציה שיכלול גם כפתורים
export interface FormConfig {
  fields: FormField[]; // רשימה של שדות הפורום
  buttons: FormButton[]; // רשימה של כפתורים
  onSubmit: (formData: Record<string, any>) => void; // פונקציה שתרוץ בסבמיט הפורום
  onReset?: () => void; // פונקציה אופציונלית לאיפוס
}
