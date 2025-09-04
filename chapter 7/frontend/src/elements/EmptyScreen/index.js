// // src/elements/EmptyScreen.js

import React from "react";
import "./index.css";

const EmptyScreen = ({ message }) => {
  return (
    <div className="empty-screen">
      <p>{message}</p>
    </div>
  );
};

export default EmptyScreen;
