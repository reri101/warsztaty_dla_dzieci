import React, { useState, useEffect } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./navbar.css";

const Menu = () => (
  <>
    <p>
      <a href="/login">Warsztaty</a>
    </p>
    <p>
      <a href="#wgpt3">Kontakt</a>
    </p>
    <p>
      <a href="#possibility">O nas</a>
    </p>
  </>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    const navbarLinksContainer = document.querySelector(".kw__navbar");
    const navbarMenuContainer = document.querySelector(
      ".kw__navbar-menu_container"
    );

    if (toggleMenu) {
      navbarMenuContainer.classList.add("shifted");
    } else {
      navbarMenuContainer.classList.remove("shifted");
    }
  }, [toggleMenu]);

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
        <Link to="/login">
          <p>Rejestracja</p>
        </Link>
        <Link to="/login">
          <button type="button">Logowanie</button>
        </Link>
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
            <p>Rejestracja</p>
            <button type="button">Logowanie</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
