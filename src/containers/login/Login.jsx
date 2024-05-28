import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGooglePlusG,
  faFacebookF,
  faGithub,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import "./login.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegisterClick = () => {
    setIsActive(true);
    setErrorMessage("");
  };

  const handleLoginClick = () => {
    setIsActive(false);
    setErrorMessage("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          useremail: email,
          password: password,
        }
      );

      localStorage.setItem("token", response.data.accessToken);

      window.location.href = "/twoje-konto";
    } catch (error) {
      setErrorMessage("Błąd logowania: sprawdź swoje dane i spróbuj ponownie.");
      console.error("Error logging in:", error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Hasła nie są zgodne.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          useremail: email,
          password: password,
        }
      );
      const loginResponse = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          useremail: email,
          password: password,
        }
      );
      localStorage.setItem("token", loginResponse.data.accessToken);

      window.location.href = "/twoje-konto";
    } catch (error) {
      setErrorMessage(
        "Błąd rejestracji: sprawdź swoje dane i spróbuj ponownie."
      );
      console.error("Error registering:", error);
    }
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errorMessage !== "") setErrorMessage("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errorMessage !== "") setErrorMessage("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (errorMessage !== "") setErrorMessage("");
  };

  return (
    <div
      className={`login_container ${isActive ? "active" : ""}`}
      id="login_container"
    >
      <div className="backdrop-filter-layer"></div>
      <div className="form-container sign-up">
        <form onSubmit={handleRegister}>
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
          <span>lub użyj wymaganych informacji</span>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Hasło"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Potwierdź hasło"
          />
          <button type="submit">Zarejestruj się</button>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </form>
      </div>
      <div className="form-container sign-in">
        <form onSubmit={handleLogin}>
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
          <span>lub wpisz dane</span>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Hasło"
          />
          <a href="#">Zapomniałeś hasła?</a>
          <button type="submit">Zaloguj się</button>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-sign_in">
            <h1>Cześć!</h1>
            <p>Jeśli posiadasz już konto, przejdź do logowania</p>
            <button className="hiddenBtn" id="login" onClick={handleLoginClick}>
              Zaloguj się
            </button>
          </div>
          <div className="toggle-panel toggle-sign_up">
            <h1>Witaj ponownie!</h1>
            <p>
              Jeśli jednak nie posiadasz jeszcze konta przejdź do rejestracji
            </p>
            <button
              className="hiddenBtn"
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
