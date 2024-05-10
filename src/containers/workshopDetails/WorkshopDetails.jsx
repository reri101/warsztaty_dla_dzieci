import React from "react";
import "./workshopDetails.css";
import mainImage from "../../assets/forest_in_the_jar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faDollarSign,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

// Mapowanie nazw angielskich na polskie
const holidaysTranslations = {
  Christmas: "Boże Narodzenie",
  Easter: "Wielkanoc",
  Mothersday: "Dzień Matki",
  Fathersday: "Dzień Taty",
  Constitutionday: "Dzień Konstytucji",
  Spring: "Wiosna",
  Summer: "Summer",
  Autumn: "Jesień",
  Winter: "Zima",
};

function WorkshopDetails({ workshop }) {
  const {
    description,
    maxAge,
    maxGroup,
    pricePerChild,
    duration,
    holiday,
    minGroupForDiscounting,
    pricePerChildDiscounted,
  } = workshop;

  // Funkcja do tłumaczenia nazwy święta
  const translateHoliday = (holidayName) => {
    return holidaysTranslations[holidayName] || holidayName;
  };

  return (
    <div className="workshopDetails section__margin">
      <div className="workshopDetails__description">
        <img
          src={mainImage}
          alt="Main Workshop Image"
          className="workshopDetails__mainImage border__radius"
        />
        <h3>Opis warsztatu</h3>
        <hr />
        <p className="workshopDetails__descriptionText">{description}</p>
      </div>
      <div className="workshopDetails__specific">
        <ul className="workshopDetails__specificList">
          <li>
            <FontAwesomeIcon icon={faClock} /> Czas realizacji
            <p>Warsztaty będą trwały około {duration}</p>
          </li>
          <li>
            <FontAwesomeIcon icon={faClock} /> Okoliczność
            <p> {holiday ? translateHoliday(holiday.name) : <></>}</p>
          </li>
          <li>
            <FontAwesomeIcon icon={faUser} /> Maksymalny wiek uczestników
            <p>Zajęcia przeznaczone są dla dzieci do {maxAge} roku życia</p>
          </li>
          <li>
            <FontAwesomeIcon icon={faUser} /> Maksymalna liczba uczestników
            <p>
              Zajęcia przewidziane są dla grup liczących do {maxGroup} dzieci
            </p>
          </li>
          <li>
            <FontAwesomeIcon icon={faDollarSign} /> Cena
            <p>
              Ostateczna cena zależy od liczby uczestników. Dla <b>grup</b>{" "}
              liczących<b> conajmniej {minGroupForDiscounting} osób</b>, cena od
              jednego dziecka wynosi <b>{pricePerChildDiscounted} zł</b>,
              natomiast dla mniejszych grup cena wynosi{" "}
              <b>{pricePerChild} zł</b> od dziecka.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default WorkshopDetails;
