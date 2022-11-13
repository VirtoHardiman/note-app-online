import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import parser from "html-react-parser";

import { ThemeContext, LanguageContext } from "../App";
import { getNote, showFormattedDate } from "../utils/network-data";
import ActionButtons from "../components/ActionButtons";
import Loading from "../components/Loading";

const NoteDetail = () => {
  const { id } = useParams();
  const [note, setNote] = useState({ body: "" });
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { language, toggleLanguage } = useContext(LanguageContext);
  const [showButtons, setShowButtons] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNote = async () => {
    const { error, data } = await getNote(id);
    if (!error) {
      setNote(data);
      return setIsLoading(false);
    }
    return setIsLoading(false);
  };

  useEffect(() => {
    fetchNote();
  }, []);

  const toggleActionButtons = (condition) => {
    setShowButtons(condition);
  };

  if (isLoading) {
    return <Loading pageName="note-content" />;
  }

  if (!isLoading && !note.id) {
    return (
      <div className="page-wrapper note">
        <h1>403</h1>
        <p>
          <span>Note's</span> <span>not found.</span>
        </p>
      </div>
    );
  }

  return (
    <div className={`note-detail ${theme}`}>
      <div className="note-container">
        <h1 className="note-title">{note.title}</h1>
        <p className="note-date">{showFormattedDate(note.createdAt, language)}</p>
        <p className="note-body">{parser(note.body)}</p>
        <ActionButtons note={note} showButtons={showButtons} toggleActionButtons={toggleActionButtons} />
      </div>
    </div>
  );
};

export default NoteDetail;
