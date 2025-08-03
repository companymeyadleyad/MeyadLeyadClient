import { FormConfig } from "./formConfigTypes";

type ValidationError = {
  field: string;
  message: string;
};

export function validateFormConfig(
  formConfig: FormConfig,
  formValues: Record<string, string | number | boolean>
): { isValid: boolean; errors: ValidationError[] } {
  const errors: ValidationError[] = [];

  // בדיקת כל שדה בקונפיגורציה
  formConfig.fields.forEach((field) => {
    // בדוק אם שם השדה מוגדר
    if (!field.name || typeof field.name !== "string") {
      errors.push({
        field: field.name,
        message: "שם השדה לא מוגדר או לא תקין",
      });
    }

    // בדוק אם סוג השדה תקין
    const validTypes = [
      "text",
      "email",
      "dropdown",
      "checkbox",
      "password",
      "match",
      "autocomplete",
      "listgroup",
    ];

    if (!validTypes.includes(field.type)) {
      errors.push({
        field: field.name,
        message: `סוג השדה "${field.type}" לא מוכר`,
      });
    }

    // אם השדה מסוג dropdown, בדוק אם יש אופציות
    if (
      field.type === "dropdown" &&
      (!field.options || field.options.length === 0)
    ) {
      errors.push({
        field: field.name,
        message: "שדה dropdown צריך לכלול אופציות",
      });
    }

    // אם השדה מסוג autocomplete, בדוק אם יש נקודת קצה לחיפוש
    if (field.type === "autocomplete" && !field.searchEndpoint) {
      errors.push({
        field: field.name,
        message: "שדה autocomplete צריך לכלול נקודת קצה לחיפוש",
      });
    }

    // אם השדה מסוג listgroup, בדוק אם יש פונקציית onItemClick
    if (field.type === "listgroup" && !field.onItemClick) {
      errors.push({
        field: field.name,
        message: "שדה listgroup צריך לכלול פונקציית onItemClick",
      });
    }

    // אם השדה מסוג match, בדוק אם יש שדה שצריך להשוות אליו
    if (field.type === "match") {
      // כאן אתה יכול לבדוק שהוולידציה אכן מכילה את השדה שאליו צריך להשוות
      const matchValidation = field.validations.find((v) => v.type === "match");

      if (!matchValidation || !matchValidation.field) {
        errors.push({
          field: field.name,
          message: "יש לציין שדה להשוואה עבור שדה match",
        });
      } else {
        // לוגיקה להשוואת ערך השדה עם שדה אחר
        if (formValues[field.name] !== formValues[matchValidation.field]) {
          errors.push({
            field: field.name,
            message: `הערכים של ${field.name} ו-${matchValidation.field} אינם תואמים`,
          });
        }
      }
    }

    // בדוק וולידציות לכל שדה
    field.validations.forEach((validation) => {
      if (
        validation.type === "minLength" &&
        (typeof validation.value !== "number" || validation.value <= 0)
      ) {
        errors.push({
          field: field.name,
          message: "וולידציית minLength דורשת ערך תקני",
        });
      }

      if (validation.type === "email" && validation.value) {
        errors.push({
          field: field.name,
          message: "לא ניתן להוסיף ערך לוולידציה מסוג email",
        });
      }

      if (
        validation.type === "required" &&
        typeof validation.message !== "string"
      ) {
        errors.push({
          field: field.name,
          message: "וולידציית required דורשת הודעת שגיאה תקנית",
        });
      }
    });
  });

  // אם לא נמצאו בעיות
  return {
    isValid: errors.length === 0,
    errors,
  };
}
