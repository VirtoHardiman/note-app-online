import React, { useContext } from "react";

import { ThemeContext, LanguageContext } from "../App";

const NotFound = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { language, toggleLanguage } = useContext(LanguageContext);

  return (
    <div className={`page-wrapper ${theme}`}>
      <h1>404</h1>
      <p>
        <span>{language === "english" ? "Something's" : "Halaman tidak"}</span> <span>{language === "english" ? "missing." : "ditemukan."}</span>
      </p>
    </div>
  );
};

export default NotFound;
