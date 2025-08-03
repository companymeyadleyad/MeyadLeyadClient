import React from "react";
import { useTranslation } from "react-i18next";


const styles: { button: React.CSSProperties } = {
    button: {
      position: "fixed",
      top: "60px",
      right: "20px",
      padding: "10px 15px",
      fontSize: "16px",
      cursor: "pointer",
      background: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      backgroundColor: ' #60c58c'
    },
  };
  


const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "he" ? "en" : "he";
    i18n.changeLanguage(newLang);
  };

  return (
    <button onClick={toggleLanguage} style={styles.button}>
      {i18n.language === "he" ? "Switch to English" : "החלף לעברית"}
    </button>
  );
};

export default LanguageSwitcher;