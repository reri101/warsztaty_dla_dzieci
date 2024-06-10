import React, { useEffect, useState } from "react";
import "./profileInformation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faLocationDot,
  faUser,
  faHouseUser,
  faDollarSign,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProfileInformation() {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    description: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
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

        setFormData({
          name: response.data.firstName,
          lastname: response.data.lastName,
          email: response.data.email,
          phone: null,
          address: response.data.address,
          description: response.data.description,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      await axios.put("http://localhost:8080/api/user/update", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/twoje-konto");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="profile_info_container">
      <div className="backdrop-filter-layer"></div>
      <div className="profile_info section__padding">
        <h4>Prosimy o uzupełnienie podstawowych danych</h4>
        <h2>Uzupełnij informacje</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>
              <b>Personalne</b>
            </h3>
            <div className="form-group">
              <div className="input_container">
                <FontAwesomeIcon icon={faUser} />
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Imię"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input_container">
                <FontAwesomeIcon icon={faHouseUser} />
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  placeholder="Nazwisko"
                  required
                />
              </div>
            </div>
          </div>
          <div className="form-section">
            <h3>
              <b>Kontaktowe</b>
            </h3>
            <div className="form-group">
              <div className="input_container">
                <FontAwesomeIcon icon={faPhone} />
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Telefon"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input_container">
                <FontAwesomeIcon icon={faLocationDot} />
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Adres twojej placówki"
                  required
                />
              </div>
            </div>
          </div>
          <div className="form-section">
            <h3>
              <b>O tobie (opcjonalne)</b>
            </h3>
            <div className="form-group">
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Opis osoby"
              ></textarea>
            </div>
          </div>
          <button type="submit" className="update-button">
            Zapisz
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileInformation;
