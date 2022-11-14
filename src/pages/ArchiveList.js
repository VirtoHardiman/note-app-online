import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { ThemeContext, LanguageContext } from "../App";
import { getArchivedNotes, searchNotes } from "../utils/network-data";
import NoteCard from "../components/NoteCard";
import EmptyState from "../components/EmptyState";
import DashboardActions from "../components/DashboardActions";
import SearchBar from "../components/SearchBar";

const ArchiveList = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [transition, setTransition] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchbar, setSearchBar] = useState(false);
  const [keyword, setKeyword] = useState("");

  const setArchivedNotes = async () => {
    if (keyword) {
      const { error, data } = await searchNotes(keyword, true);
      if (!error) {
        setSearch(false);
        return setNotes(data);
      }
    }
    const { error, data } = await getArchivedNotes();
    if (!error) {
      setSearch(false);
      return setNotes(data);
    }
  };

  useEffect(() => {
    const noteTitle = searchParams.get("title");
    if (noteTitle) {
      setKeyword(noteTitle);
      setSearch(true);
    }
  }, []);

  useEffect(() => {
    setArchivedNotes();
  }, [search]);

  const changeSearchParams = (keyword) => {
    setSearchParams({ title: keyword });
  };

  const showSelectedNote = (id) => {
    setTransition(true);
    setTimeout(() => {
      navigate(`/note-app-online/note/${id}`);
    }, 800);
  };

  const toggleSearchBar = (condition) => {
    setSearchBar(condition);
  };

  const keywordHandler = (event) => {
    setKeyword(event.target.value);
  };

  const onSearch = () => {
    changeSearchParams(keyword);
    setSearch(true);
  };

  return (
    <>
      <div
        className={`page-overlay ${transition ? theme : ""} darker`}
        onClick={() => toggleSearchBar(false)}
      >
        <div className={`notes-wrapper ${transition ? "hide" : ""}`}>
          {notes.length !== 0 ? (
            notes.map((note) => (
              <NoteCard
                note={note}
                showSelectedNote={showSelectedNote}
                key={note.id}
              />
            ))
          ) : (
            <EmptyState message="Archive's not found" />
          )}

          <DashboardActions
            showSearchbar={searchbar}
            toggleSearchBar={toggleSearchBar}
            noteList={false}
          />

          <SearchBar
            showSearchbar={searchbar}
            toggleSearchBar={toggleSearchBar}
            keyword={keyword}
            keywordHandler={keywordHandler}
            onSearch={onSearch}
          />
        </div>
      </div>
    </>
  );
};

export default ArchiveList;
