import React from "react";
import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faMailBulk,
  faHomeAlt,
} from "@fortawesome/free-solid-svg-icons";

import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="kw__footer ">
      <div className="kw__footer-main">
        <div className="kw__footer-company">
          <h2>KreatywnyRex</h2>
          <p>
            Jesteśmy firmą oferującą różnorodne warsztaty dla dzieci, od
            artystycznych i sensorycznych po kulinarne. Zajęcia rozwijają
            kreatywność i umiejętności manualne dzieci w atmosferze radości i
            bezpieczeństwa.
          </p>
        </div>
        <div className="kw__footer-contact">
          <h2>Kontakt</h2>
          <ul>
            <li>
              <FontAwesomeIcon icon={faPhone} />
              <a href="tel:+48345456567"> 345456567</a>
            </li>
            <li>
              <FontAwesomeIcon icon={faMailBulk} />
              <a href="mailto:contact@kidsworkshop.pl">
                contact@kidsworkshop.pl
              </a>
            </li>
            <li>
              <FontAwesomeIcon icon={faHomeAlt} />
              <a href="">Targowa 22, 90-042 Łódź</a>
            </li>
          </ul>
        </div>
        <div className="kw__footer-shortcuts">
          <h2>Skróty</h2>
          <ul>
            <li>
              <a href="/">Kontakt</a>
            </li>
            <li>
              <a href="/">O nas</a>
            </li>
            <li>
              <a href="/">Regulamin</a>
            </li>
            <li>
              <a href="/">Polityka prywatności</a>
            </li>
          </ul>
        </div>
        <div className="kw__footer-media">
          <h2>Social media</h2>
          <ul>
            <li>
              <FontAwesomeIcon icon={faFacebook} />
              <a href="/">Facebook</a>
            </li>
            <li>
              <FontAwesomeIcon icon={faInstagram} />
              <a href="/">Instagram</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="kw__footer-copyright">
        <p>Copyright © 2024 KreatywnyRex. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
