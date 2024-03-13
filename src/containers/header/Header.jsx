import React from "react";
import "./header.css";
import people from "../../assets/people.png";
import ai from "../../assets/ai.png";

const Header = () => {
  return (
    <div className="gpt3__header" id="home">
      <div className="gpt3__header-content">
        <h1>Let’s Build Something amazing</h1>
        <p>Odkryj najlepsze salony w okolicy i zarezerwuj wizytę online!</p>

        <div className="gpt3__header-content__input">
          <input type="email" placeholder="Your Email Addres" />
        </div>
      </div>
    </div>
  );
};

export default Header;
