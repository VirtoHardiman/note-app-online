import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { ThemeContext, LanguageContext } from "../App";
import { getActiveNotes, searchNotes } from "../utils/network-data";
import NoteCard from "../components/NoteCard";
import EmptyState from "../components/EmptyState";
import DashboardActions from "../components/DashboardActions";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";

const NoteList = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [transition, setTransition] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchbar, setSearchBar] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const setActiveNotes = async () => {
    if (keyword) {
      const { error, data } = await searchNotes(keyword, false);
      if (!error) {
        setSearch(false);
        setNotes(data);
        return setIsLoading(false);
      }
      return setIsLoading(false);
    }
    const { error, data } = await getActiveNotes();
    if (!error) {
      setSearch(false);
      setNotes(data);
      return setIsLoading(false);
    }
    return setIsLoading(false);
  };

  useEffect(() => {
    const noteTitle = searchParams.get("title");
    if (noteTitle) {
      setKeyword(noteTitle);
      setSearch(true);
    }
  }, []);

  useEffect(() => {
    setActiveNotes();
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      className={`page-overlay ${transition ? theme : ""}`}
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
          <EmptyState message="Note's not found" />
        )}
        <DashboardActions
          showSearchbar={searchbar}
          toggleSearchBar={toggleSearchBar}
          noteList={true}
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
  );
};

export default NoteList;
