import React from "react";
import "./popularProducts.css";
import { PopularProduct } from "../../components";

const PopularProducts = () => {
  return (
    <div className="popularPrdcs section__padding">
      <h2 className="gradient__text">Popularne warsztaty</h2>
      <p>Te zajęcia pokochali nasi klienci</p>
      <div className="product-container">
        <PopularProduct />
        <PopularProduct />
        <PopularProduct />
        <PopularProduct />
        <PopularProduct />
        <PopularProduct />
        <PopularProduct />
        <PopularProduct />
        <PopularProduct />
        <PopularProduct />
      </div>
    </div>
  );
};

export default PopularProducts;
