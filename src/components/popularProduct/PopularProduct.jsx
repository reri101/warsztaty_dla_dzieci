import React, { useState } from "react";
import "./popularProduct.css";
import workshop_photo from "../../assets/kids_workshop_background.jpg";
import { Link } from "react-router-dom";

const PopularProduct = ({ workshop }) => {
  const workshopDetails = workshop;
  return (
    <div className="popularProductContainer">
      <Link to={`/warsztat/${workshop.id}`}>
        <div className="popularP">
          <img src={workshop_photo} alt="workshop_photo" />
          <div className="description">
            {workshopDetails.holyday != null ? (
              <span> {workshopDetails.holyday.name}</span>
            ) : (
              <></>
            )}
            <h5>{workshopDetails.title}</h5>
            <p>
              <b>Czas trwania:</b> {workshopDetails.duration} -{" "}
              {workshopDetails.duration + 15} minut
            </p>
            <p>
              <b>Max ilość osób w grupie:</b> {workshopDetails.maxGroup}
            </p>
            <p>
              <b>Wiek uczestników:</b> do {workshopDetails.maxAge} lat
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PopularProduct;
