import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineMoreVert,
  MdClose,
  MdOutlineDelete,
  MdOutlineArchive,
  MdOutlineUnarchive,
} from "react-icons/md";
import PropTypes from "prop-types";

import { archiveNote, unarchiveNote, deleteNote } from "../utils/network-data";
import { ToasterContext } from "../App";

const ActionButtons = ({ note, showButtons, toggleActionButtons }) => {
  const navigate = useNavigate();
  const { toaster, toggleToaster } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleArchive = async () => {
    setIsLoading(true);
    const { status, message } = await archiveNote(note.id);
    if (status === "success") {
      toggleToaster(message);
      navigate("/note-app-online/archives");
    }
    setIsLoading(false);
    toggleToaster(message);
  };

  const handleUnarchive = async () => {
    setIsLoading(true);
    const { status, message } = await unarchiveNote(note.id);
    if (status === "success") {
      toggleToaster(message);
      navigate("/note-app-online");
    }
    setIsLoading(false);
    toggleToaster(message);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    const { status, message } = await deleteNote(note.id);
    if (status === "success") {
      toggleToaster(message);
      note.archived
        ? navigate("/note-app-online/archives")
        : navigate("/note-app-online");
    }
    setIsLoading(false);
    toggleToaster(message);
  };

  return (
    <div className="note-actions">
      {showButtons ? (
        <>
          <button
            onClick={() => toggleActionButtons(false)}
            className="close-button"
          >
            <MdClose className="close-icon" alt="close-icon" />
          </button>

          {note.archived ? (
            <button
              onClick={handleUnarchive}
              className="unarchive-button"
              disabled={isLoading}
            >
              <MdOutlineUnarchive
                className="unarchive-icon"
                alt="unarchive-icon"
              />
            </button>
          ) : (
            <button
              onClick={handleArchive}
              className="archive-button"
              disabled={isLoading}
            >
              <MdOutlineArchive className="archive-icon" alt="archive-icon" />
            </button>
          )}

          <button
            onClick={handleDelete}
            className="delete-button"
            disabled={isLoading}
          >
            <MdOutlineDelete className="delete-icon" alt="delete-icon" />
          </button>
        </>
      ) : (
        <button
          onClick={() => toggleActionButtons(true)}
          className="more-button"
        >
          <MdOutlineMoreVert className="more-icon" alt="more-icon" />
        </button>
      )}
    </div>
  );
};

ActionButtons.propTypes = {
  note: PropTypes.object.isRequired,
  showButtons: PropTypes.bool.isRequired,
  toggleActionButtons: PropTypes.func.isRequired,
};

export default ActionButtons;
