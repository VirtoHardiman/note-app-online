import React from "react";
import PropTypes from "prop-types";

const SearchBar = ({ showSearchbar, keyword, keywordHandler, onSearch }) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSearch();
      }}
    >
      <input type="text" placeholder="e.g New Year Resolution" className={`search-bar ${showSearchbar ? "" : "hide"}`} value={keyword} onChange={keywordHandler} onClick={(event) => event.stopPropagation()} />
      <input type="submit" hidden onClick={(event) => event.stopPropagation()} />
    </form>
  );
};

SearchBar.propTypes = {
  showSearchbar: PropTypes.bool.isRequired,
  keyword: PropTypes.string.isRequired,
  keywordHandler: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
