import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [position, setPosition] = useState(null);
  const {
    description,
    maxAge,
    maxGroup,
    pricePerChild,
    duration,
    holiday,
    minGroupForDiscounting,
    pricePerChildDiscounted,
    workshopArea,
  } = workshop;
  const instructorRating = 3.4;

  useEffect(() => {
    // Funkcja do geokodowania
    const geocodePlace = async (placeName) => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search`,
          {
            params: {
              q: placeName,
              format: "json",
            },
          }
        );
        if (response.data && response.data.length > 0) {
          const { lat, lon } = response.data[0];
          setPosition([parseFloat(lat), parseFloat(lon)]);
        }
      } catch (error) {
        console.error("Geocoding error:", error);
      }
    };

    if (workshopArea) {
      geocodePlace(workshopArea);
    }
  }, [workshopArea]);

  const translateHoliday = (holidayName) => {
    return holidaysTranslations[holidayName] || holidayName;
  };

  const openModal = () => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        if (!token) {
          navigate("/login");
          return;
        }
        const response = await axios.get(
          "http://localhost:8080/api/user/info",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.phone);
        if (!response.data.phone) {
          navigate("/profile-info");
        }
        setUserId(response.data.id);
      } catch (error) {
        console.error("Error fetching user data:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUser();
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // Ikona markera
  const customMarker = new L.Icon({
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    shadowSize: [41, 41],
  });

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
          {position && (
            <li className="workshopArea_map">
              <div className="workshopArea_title">
                <p>
                  Wykonujemy ten warsztat w mieście <b>{workshopArea}</b> i
                  okolicach
                </p>
              </div>
              <MapContainer
                center={position}
                zoom={10}
                style={{ height: "310px", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position} icon={customMarker}>
                  <Popup>{workshopArea}</Popup>
                </Marker>
                <Circle
                  center={position}
                  radius={12000} // Promień w metrach
                  color="blue"
                  fillColor="blue"
                  fillOpacity={0.2}
                />
              </MapContainer>
            </li>
          )}
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
              Ostateczna cena zależy od liczby uczestników. Dla grup liczących{" "}
              <b>co najmniej {minGroupForDiscounting} osób</b>, koszt wynosi{" "}
              <b>{pricePerChildDiscounted} zł</b> za dziecko. Dla mniejszych
              grup, koszt wynosi <b>{pricePerChild} zł</b> za dziecko.
            </p>
          </li>
        </ul>
      </div>
      {modalOpen && (
        <RezervationModal
          workshop={workshop}
          onClose={closeModal}
          userId={userId}
        />
      )}
    </div>
  );
}

export default WorkshopDetails;
