import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGooglePlusG,
  faFacebookF,
  faGithub,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

import "./login.css";

const Login = () => {
  const [isActive, setIsActive] = useState(false);

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  return (
    <div
      className={`login_container ${isActive ? "active" : ""}`}
      id="login_container"
    >
      <div className="backdrop-filter-layer"></div>
      <div className="form-container sign-up">
        <form>
          <h1>Utwórz konto za pomocą:</h1>
          <div className="socials-icons">
            <a href="#" className="icon">
              <FontAwesomeIcon icon={faGooglePlusG} />
            </a>
            <a href="#" className="icon">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className="icon">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="#" className="icon">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>
          <span>lub użyj danych do rejestracji</span>
          <input type="text" placeholder="Imię i nazwisko" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Hasło" />
          <input type="password" placeholder="Potwierdź hasło" />
          <button>Zarejestruj się</button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form>
          <h1>Logowanie za pomocą:</h1>
          <div className="socials-icons">
            <a href="#" className="icon">
              <FontAwesomeIcon icon={faGooglePlusG} />
            </a>
            <a href="#" className="icon">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className="icon">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="#" className="icon">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>
          <span>lub użyj emaila i hasła</span>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Hasło" />
          <a href="#">Zapomniałeś hasła?</a>
          <button>Zaloguj się</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-sign_in">
            <h1>Cześć!</h1>
            <p>Jeśli posiadasz już konto, przejdź do logowania</p>
            <button className="hidden" id="login" onClick={handleLoginClick}>
              Zaloguj się
            </button>
          </div>
          <div className="toggle-panel toggle-sign_up">
            <h1>Witaj ponownie!</h1>
            <p>
              Jeśli jednak nie posiadasz jeszcze konta przejdź do rejestracji
            </p>
            <button
              className="hidden"
              id="register"
              onClick={handleRegisterClick}
            >
              Zarejestruj się
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
