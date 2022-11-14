import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineCheck, MdOutlinePalette } from "react-icons/md";
import TextareaAutosize from "react-textarea-autosize";
import ContentEditable from "react-contenteditable";

import { ThemeContext, LanguageContext, ToasterContext } from "../App";
import { addNote } from "../utils/network-data";
import useInput from "../hooks/useInput";

const AddNote = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { language, toggleLanguage } = useContext(LanguageContext);
  const { toaster, toggleToaster } = useContext(ToasterContext);
  const body = useRef("");
  const [title, setTitle] = useInput("");
  const [isLoading, setIsLoading] = useState("");

  const bodyInputHandler = (event) => {
    body.current = event.target.value;
  };

  const submitNote = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (!title || !body.current) {
      toggleToaster(
        language === "english"
          ? "Note title and content is required!"
          : "Judul dan isi catatan wajib diisi!"
      );
      return setIsLoading(false);
    }
    const editedBody = body.current;
    const { status, message } = await addNote({ title, body: editedBody });
    if (status === "success") {
      toggleToaster(message);
      setIsLoading(false);
      navigate("/note-app-online");
    }
    setIsLoading(false);
    toggleToaster(message);
  };

  return (
    <div className={`add-note ${theme}`}>
      <form className="add-container">
        <TextareaAutosize
          name="title-input"
          value={title}
          placeholder={
            language === "english"
              ? "e.g Today's Agenda"
              : "e.g Agenda Hari Ini"
          }
          className="title-input"
          onInput={setTitle}
        />
        <ContentEditable
          html={body.current}
          onChange={bodyInputHandler}
          data-placeholder={
            language === "english"
              ? "e.g 1. Jogging at 8 AM"
              : "e.g 1. Jam 8 lari pagi"
          }
          className="body-input"
        />
        <button onClick={submitNote} className="check-button">
          <MdOutlineCheck className="check-icon" />
        </button>
      </form>
    </div>
  );
};

export default AddNote;
