// contexts/LanguageContext.jsx
import { createContext, useContext, useState } from "react";
import i18n from "i18next";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(i18n.language || "fr");

  const changeLanguage = (lang) => {
    if (i18n && typeof i18n.changeLanguage === "function") {
      i18n.changeLanguage(lang);
      setLanguage(lang);
    } else {
      console.error("i18n instance is not available");
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
