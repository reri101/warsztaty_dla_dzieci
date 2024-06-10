import React, { useState, useEffect } from "react";
import { RiMenu3Line, RiCloseLine, RiUserLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

const Menu = () => (
  <>
    <p>
      <a href="/warsztaty">Warsztaty</a>
    </p>
    <p>
      <a href="/">Kontakt</a>
    </p>
    <p>
      <a href="/">O nas</a>
    </p>
  </>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
    } else {
      setIsLoggedIn(false);
      localStorage.setItem("isLoggedIn", "false");
    }

    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const navbarMenuContainer = document.querySelector(
      ".kw__navbar-menu_container"
    );

    if (toggleMenu) {
      navbarMenuContainer.classList.add("shifted");
    } else {
      navbarMenuContainer.classList.remove("shifted");
    }
  }, [toggleMenu]);

  const handleProfileClick = () => {
    navigate("/twoje-konto");
  };

  return (
    <div className="kw__navbar">
      <div className="kw__navbar-links">
        <div className="kw__navbar-links_logo">
          {/* <img src={logo} alt="logo" /> */}
          <Link to={"/"}>
            <h2>KreatywnyRex</h2>
          </Link>
        </div>
        <div className="kw__navbar-links_container">
          <Menu />
        </div>
      </div>
      <div className="kw__navbar-sign">
        {isLoggedIn ? (
          <RiUserLine
            color="#fff"
            size={27}
            onClick={handleProfileClick}
            style={{ cursor: "pointer" }}
          />
        ) : (
          <>
            <Link to="/login">
              <p>Rejestracja</p>
            </Link>
            <Link to="/login">
              <button type="button">Logowanie</button>
            </Link>
          </>
        )}
      </div>
      <div className="kw__navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
      </div>
      <div className="kw__navbar-menu_container">
        <div className="kw__navbar-menu_container-links">
          <Menu />
          <div className="kw__navbar-menu_container-links-sign">
            {isLoggedIn ? (
              <RiUserLine
                color="#fff"
                size={27}
                onClick={handleProfileClick}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <>
                <p>Rejestracja</p>
                <button type="button">Logowanie</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
