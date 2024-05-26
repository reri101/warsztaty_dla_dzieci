import React from "react";
import "./button.css";

function Button({ text, onClick }) {
  return (
    <button className="btn --gradient-text" onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
