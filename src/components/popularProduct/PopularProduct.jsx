import React, { useState } from "react";
import "./popularProduct.css";
import workshop_photo from "../../assets/kids_workshop_background.jpg";

const PopularProduct = () => {
  return (
    <div className="popularP">
      <img src={workshop_photo} alt="workshop_photo" />
      <div className="description">
        <span>artysctyczne</span>
        <h5>Las w słoiku</h5>
        <p>
          <b>Czas trwania:</b> 45 minut
        </p>
        <p>
          <b>Max ilość osób w grupie:</b> 40
        </p>
        <p>
          <b>Wiek uczestników:</b> 3-18 lat
        </p>
      </div>
    </div>
  );
};

export default PopularProduct;
