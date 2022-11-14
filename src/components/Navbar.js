import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { ToasterContext } from "../App";
import { MdOutlineLogout } from "react-icons/md";

const Navbar = () => {
  const { toaster, toggleToaster } = useContext(ToasterContext);
  const [username, setUsername] = useState(localStorage.getItem("username"));

  useEffect(() => {
    if (toaster === "User retrieved") {
      setUsername(localStorage.getItem("username"));
    }
  }, [toaster]);

  const resetCurrentUser = () => {
    localStorage.setItem("accessToken", "");
    localStorage.setItem("username", "");
    setUsername("");
  };

  return (
    <nav>
      <Link to="/note-app-online">NoteApp</Link>
      {username ? (
        <Link
          to="/note-app-online/login"
          onClick={resetCurrentUser}
          className="logout-button"
        >
          <p>{username.slice(1, -1)}</p>
          <MdOutlineLogout alt="logout-icon" />
        </Link>
      ) : null}
    </nav>
  );
};

export default Navbar;
