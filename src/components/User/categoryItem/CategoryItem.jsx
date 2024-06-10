import React from "react";
import "./categoryItem.css";
import { Link } from "react-router-dom";

const CategoryItem = ({ keyId, title, photo }) => {
  return (
    <div key={keyId} className="caegoryItem_contener">
      <Link to={`/warsztaty?category=${title}`}>
        <div className="categoryItem">
          <div className="categoryItem-image">
            <img src={photo} alt="" />
          </div>
          <h3>{title}</h3>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
