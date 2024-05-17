import React, { useEffect, useState } from "react";
import "./popularProducts.css";
import { PopularProduct } from "../../components";
import { Link } from "react-router-dom";

const PopularProducts = () => {
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/workshop`);
        const data = await response.json();
        setWorkshops(data.content);
      } catch (error) {
        console.error("Error fetching workshops:", error);
      }
    };

    fetchWorkshops();
  }, []);

  return (
    <div className="popularPrdcs section__padding">
      <h2 className="gradient__text">Popularne warsztaty</h2>
      <p>Te zajęcia pokochali nasi klienci</p>
      <div className="product-container">
        {workshops.map((workshop) => (
          <PopularProduct workshop={workshop} />
        ))}
      </div>
    </div>
  );
};

export default PopularProducts;
