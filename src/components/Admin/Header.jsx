import React from "react";
import { useStateContext } from "../../contexts/ContextProvider";

function Header({ category, title, buttonText, buttonOnClick }) {
  const { currentColor } = useStateContext();
  return (
    <div className="flex justify-between items-center mb-10">
      <div>
        <p className="text-gray-400">{category}</p>
        <p className="text-3xl font-extrabold tracking-tight text-slate-900">
          {title}
        </p>
      </div>
      {buttonText && buttonOnClick && (
        <button
          className="text-white bg-blue-500 rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none"
          style={{ backgroundColor: currentColor }}
          onClick={buttonOnClick}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}

export default Header;
