import React, { useContext } from "react";

import { ToasterContext } from "../App";

const Toaster = () => {
  const { toaster, toggleToaster } = useContext(ToasterContext);
  return (
    <div className={`toaster ${toaster ? "show" : ""}`}>
      <p>{toaster}</p>
    </div>
  );
};

export default Toaster;
