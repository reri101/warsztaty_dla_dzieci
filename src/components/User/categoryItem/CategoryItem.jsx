import React from "react";
import "./categoryItem.css";

const CategoryItem = ({ title, photo }) => {
  return (
    <div className="categoryItem">
      <div className="categoryItem-image">
        <img src={photo} alt="" />
      </div>
      <h3>{title}</h3>
    </div>
  );
};

export default CategoryItem;
