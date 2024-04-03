import React from "react";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <div className="kw__header" id="home">
      <div className="kw__header-content">
        <h1>Wybierz idealny warsztat</h1>
        <p>Odkryj najlepsze warsztaty i zarezerwuj termin online!</p>

        <div className="kw__header-content__input">
          <FontAwesomeIcon icon={faSearch} />
          <input type="email" placeholder="Wyszukaj..." />
        </div>
      </div>
    </div>
  );
};

export default Header;
