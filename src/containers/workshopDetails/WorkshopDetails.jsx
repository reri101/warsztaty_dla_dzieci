import React, { useState } from "react";
import "./workshopDetails.css";
import mainImage from "../../assets/forest_in_the_jar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faUser,
  faDollarSign,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../components";
import joannaPhoto from "../../assets/joannaN.png";
import RezervationModal from "../rezervationModal/RezervationModal";

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

function renderStars(rating) {
  const fullStars = Math.floor(rating); // Ilość pełnych gwiazdek
  const decimalPart = rating - fullStars; // Część dziesiętna oceny
  const stars = []; // Tablica do przechowywania elementów JSX gwiazdek

  // Funkcja do tworzenia pojedynczej gwiazdki
  const renderStar = (key, overflow) => (
    <span className="starContainer" key={key}>
      <FontAwesomeIcon icon={faStar} className="goldStar" />
      <span className="starClip" style={{ width: `${overflow * 100}%` }}>
        <FontAwesomeIcon icon={faStar} className="goldStar" />
      </span>
    </span>
  );

  // Dodaj pełne gwiazdki do tablicy
  for (let i = 0; i < fullStars; i++) {
    stars.push(renderStar(i, 0)); // Bez obcięcia, pełna gwiazdka
  }

  // Dodaj gwiazdkę w połowie, jeśli ocena ma część dziesiętną
  if (decimalPart > 0) {
    stars.push(renderStar(fullStars, decimalPart)); // Z częściowym obcięciem
  }

  // Dodaj brakujące pełne gwiazdki, aby uzyskać 5 gwiazdek w sumie
  const totalStars = fullStars + (decimalPart > 0 ? 1 : 0);
  for (let i = totalStars; i < 5; i++) {
    stars.push(renderStar(i, 1)); // Bez obcięcia, pusta gwiazdka
  }

  return stars; // Zwróć tablicę gwiazdek
}

function WorkshopDetails({ workshop }) {
  const [modalOpen, setModalOpen] = useState(false);
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
  const instructorRating = 3.4;

  // Funkcja do tłumaczenia nazwy święta
  const translateHoliday = (holidayName) => {
    return holidaysTranslations[holidayName] || holidayName;
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="workshopDetails section__margin">
      <div className="workshopDetails__description">
        <img
          src={mainImage}
          alt="Main Workshop"
          className="workshopDetails__mainImage border__radius"
        />
        <h3>Opis warsztatu</h3>
        <hr />
        <p className="workshopDetails__descriptionText">{description}</p>
        <Button text={"Zarezerwój"} onClick={openModal} />
      </div>
      <div className="workshopDetails__specific">
        <ul className="workshopDetails__specificList">
          <li className="instructor-li">
            <div className="workshopDetails__instructor">
              <div className="workshopDetails__instructorPhoto">
                <img src={joannaPhoto} alt={"Joanna Nowak"} />
              </div>

              <div className="workshopDetails__instructorInfo">
                <p className="instructorName">{"Joanna Nowak - prowadząca"}</p>
                <p className="instructorOpinion">
                  {renderStars(instructorRating)}
                </p>
                <p className="instructorDescription">
                  {
                    "Spotkaj Joasie - naszą pasjonatkę sztuki i edukacji. Jej radosne podejście do życia sprawia, że dzieci czują się swobodnie i chętnie uczestniczą w zajęciach. Z Joasią każdy dzień to nowa przygoda!"
                  }
                </p>
              </div>
            </div>
          </li>
          <li>
            <FontAwesomeIcon icon={faClock} />
            Czas realizacji
            <p>Warsztaty będą trwały około {duration} minut</p>
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
      {modalOpen && <RezervationModal onClose={closeModal} />}
    </div>
  );
}

export default WorkshopDetails;
