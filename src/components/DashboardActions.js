import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineNoteAdd,
  MdOutlineSearch,
  MdOutlineWbSunny,
  MdOutlineDarkMode,
  MdInventory,
  MdArticle,
  MdGTranslate,
} from "react-icons/md";
import PropTypes from "prop-types";

import { ThemeContext, LanguageContext } from "../App";

const DashboardActions = ({ showSearchbar, toggleSearchBar, noteList }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { language, toggleLanguage } = useContext(LanguageContext);

  return (
    <>
      <button onClick={() => navigate("/new")} className="add-button">
        <MdOutlineNoteAdd className="add-icon" alt="add-icon" />
      </button>
      <button onClick={toggleTheme} className="theme-button">
        {theme === "light" ? (
          <MdOutlineDarkMode className="theme-icon" alt="moon-icon" />
        ) : (
          <MdOutlineWbSunny className="theme-icon" alt="sun-icon" />
        )}
      </button>
      {noteList ? (
        <button
          onClick={() => navigate("/archives")}
          className="archive-list-button"
        >
          <MdInventory className="archive-list-icon" alt="archive-list-icon" />
        </button>
      ) : (
        <button onClick={() => navigate("/")} className="note-list-button">
          <MdArticle className="note-list-icon" alt="note-list-icon" />
        </button>
      )}
      <button onClick={toggleLanguage} className="language-button">
        <MdGTranslate className="language-icon" alt="language-icon" />
      </button>
      {!showSearchbar && (
        <button
          onClick={(event) => {
            event.stopPropagation();
            toggleSearchBar(true);
          }}
          className="search-button"
        >
          <MdOutlineSearch className="search-bar-icon" alt="search-bar-icon" />
        </button>
      )}
    </>
  );
};

DashboardActions.propTypes = {
  showSearchbar: PropTypes.bool.isRequired,
  toggleSearchBar: PropTypes.func.isRequired,
  noteList: PropTypes.bool.isRequired,
};

export default DashboardActions;
