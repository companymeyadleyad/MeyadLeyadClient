//import { getData } from "./apiService";
//import { Dropdown } from "types/Navigation/NavigationResponse";

export class NavigationService {
  getDropdownItems = async () => {
    const endpoint = "/Data/dropdown.json";
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error: unknown) {
      console.error("Error fetching dropdown items:", error);
      throw error;
    }
  };
}

/*
  בעתיד, כשתרצה למשוך נתונים מה-DB, תוכל להשתמש ב- getData<Dropdown> כך:
  
  getDropdownItems = async () => {
    const endpoint = "/api/dropdown"; // הנתיב ל-API שמחובר ל-DB
    try {
      return await getData<Dropdown[]>(endpoint); // שימוש בפונקציה כללית לשליפת נתונים מה-DB
    } catch (error: unknown) {
      console.error("Error fetching dropdown items from DB:", error);
      throw error;
    }
  };
  */
