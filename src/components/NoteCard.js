import React, { useContext } from "react";
import parser from "html-react-parser";
import PropTypes from "prop-types";

import { LanguageContext } from "../App";
import { showFormattedDate } from "../utils/network-data";

const NoteCard = ({ note, showSelectedNote }) => {
  const { language, toggleLanguage } = useContext(LanguageContext);
  const { id, title, body, createdAt } = note;

  return (
    <div className="note-card" onClick={() => showSelectedNote(id)}>
      <p className="card-title">{title}</p>
      <p className="card-date">{showFormattedDate(createdAt, language)}</p>
      <p className="card-body">{parser(body)}</p>
    </div>
  );
};

NoteCard.propTypes = {
  note: PropTypes.object.isRequired,
  showSelectedNote: PropTypes.func.isRequired,
};

export default NoteCard;
