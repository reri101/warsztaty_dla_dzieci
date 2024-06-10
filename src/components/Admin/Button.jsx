import React, { useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";

function Button({
  icon,
  bgColor,
  color,
  bgHoverColor,
  size,
  text,
  borderRadius,
  width,
}) {
  const { setIsClicked, initialState } = useStateContext();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const navigate = useNavigate();
  const handleOnClick = () => {
    setIsClicked(initialState);
    if(text==="Wyloguj się"){
      localStorage.removeItem("token");
      navigate("/");
  }
  };

  return (
    <button
      type="button"
      onClick={() => handleOnClick()}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={`text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
}

export default Button;
