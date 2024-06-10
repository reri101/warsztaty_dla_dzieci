import React, { useEffect, useState } from "react";
import "./workshops.css";
import { useLocation, useParams } from "react-router-dom";
import { Navbar, PopularProduct } from "../../components";
import { Footer } from "../../containers";
import axios from "axios";

function Workshops() {
  const [workshops, setWorkshops] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const location = useLocation();

  const fetchWorkshops = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/workshop?pageNumber=${page}`
      );
      setWorkshops(response.data.content);
      setTotalPages(response.data.totalPages);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error fetching workshops:", error);
    }
  };

  const fetchWorkshopsByCategories = async (categories, page) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/workshop/by-category?pageNumber=${page}&categoryTitles=${categories}`
      );
      setWorkshops(response.data.content);
      setTotalPages(response.data.totalPages);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error fetching workshops by category:", error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPageNumber(newPage);
      if (selectedCategories.length > 0) {
        fetchWorkshopsByCategories(selectedCategories, newPage);
      } else {
        fetchWorkshops(newPage);
      }
    }
  };

  const handleCategoryClick = (categoryTitle) => {
    const index = selectedCategories.indexOf(categoryTitle);
    if (index === -1) {
      const newSelectedCategories = [...selectedCategories, categoryTitle];
      setSelectedCategories(newSelectedCategories);
      fetchWorkshopsByCategories(newSelectedCategories, 0);
    } else {
      const updatedCategories = selectedCategories.filter(
        (c) => c !== categoryTitle
      );
      setSelectedCategories(updatedCategories);
      if (updatedCategories.length > 0) {
        fetchWorkshopsByCategories(updatedCategories, 0);
      } else {
        fetchWorkshops(0);
      }
    }
    setPageNumber(0);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();

    const queryParams = new URLSearchParams(location.search);
    const categoryFromUrl = queryParams.get("category");
    if (categoryFromUrl) {
      setSelectedCategories([categoryFromUrl]);
      fetchWorkshopsByCategories([categoryFromUrl], 0);
    } else {
      fetchWorkshops(0);
    }
  }, [location.search]);

  return (
    <div className="workshopsPage">
      <Navbar />
      <div className="workshopsPage__header">
        <h1>Nasze warsztaty</h1>
      </div>
      <div className="category-container">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`category-item ${
              selectedCategories.includes(category.name) ? "selected" : ""
            }`}
            onClick={() => handleCategoryClick(category.name)}
          >
            {category.name}
          </div>
        ))}
      </div>
      <div className="product-container section__padding">
        {workshops.map((workshop) => (
          <PopularProduct workshop={workshop} key={workshop.id} />
        ))}
      </div>
      <div className="pagination">
        <button
          className="pagination-button"
          disabled={pageNumber === 0}
          onClick={() => handlePageChange(pageNumber - 1)}
        >
          Poprzednia
        </button>
        <span className="pagination-info">
          Strona {pageNumber + 1} z {totalPages}
        </span>
        <button
          className="pagination-button"
          disabled={pageNumber === totalPages - 1}
          onClick={() => handlePageChange(pageNumber + 1)}
        >
          Następna
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Workshops;
