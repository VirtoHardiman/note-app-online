import React, { useContext } from "react";
import PropTypes from "prop-types";

import { ThemeContext, LanguageContext } from "../App";

const Loading = ({ pageName = "" }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { language, toggleLanguage } = useContext(LanguageContext);

  return (
    <div className={`loading-underlay ${pageName} ${theme}`}>
      <div className="loading-wrapper">
        <div className="ball"></div>
        <div className="ball-two"></div>
        <h2>{language === "english" ? "Loading.." : "Memuat.."}</h2>
      </div>
    </div>
  );
};

Loading.propTypes = {
  pageName: PropTypes.string,
};

export default Loading;
