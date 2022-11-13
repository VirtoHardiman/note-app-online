import React from "react";
import { MdOutlineSubtitlesOff } from "react-icons/md";
import PropTypes from "prop-types";

const EmptyState = ({ message }) => {
  return (
    <div className="empty-state">
      <MdOutlineSubtitlesOff alt="empty-icon" />
      <p>{message}</p>
    </div>
  );
};

EmptyState.propTypes = {
  message: PropTypes.string.isRequired,
};

export default EmptyState;
