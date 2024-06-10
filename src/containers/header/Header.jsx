import React, { useEffect, useRef, useState } from "react";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef(null);
  const searchRef = useRef(null);

  const fetchData = async (value) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/workshop/suggestions?titleFragment=${value}`
      );
      setResult(response.data);
      setShowResults(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    if (value !== "") fetchData(value);
    else {
      setResult(null);
      setShowResults(false);
    }
  };

  const handleClickOutside = (event) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target) &&
      inputRef.current &&
      !inputRef.current.contains(event.target)
    ) {
      setShowResults(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="kw__header" id="home">
      <div className="kw__header-content">
        <h1>Wybierz idealny warsztat</h1>
        <p>Odkryj najlepsze warsztaty i zarezerwuj termin online!</p>

        <div className="kw__header-content__input">
          <FontAwesomeIcon icon={faSearch} />
          <input
            placeholder="Wyszukaj..."
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={() => input && setShowResults(true)}
            ref={inputRef}
          />
        </div>
        {showResults && result && (
          <div className="kw__header-content__search" ref={searchRef}>
            {result.map((workshop, index) => (
              <Link to={`/warsztat/${workshop.id}`}>
                <div className="kw__header-workshop_result" key={index}>
                  <p>{workshop.title}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
