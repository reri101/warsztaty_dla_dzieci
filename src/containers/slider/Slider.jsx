import React, { useEffect, useRef, useState } from "react";
import "./slider.css";
import { CategoryItem } from "../../components";
import photo1 from "../../assets/kids_workshop_background.jpg";

const Slider = () => {
  const sliderRef = useRef(null);
  const [children, setChildren] = useState([]);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [categories, setCategories] = useState([]);

  const handleScroll = (direction) => {
    const currentTime = new Date().getTime();

    if (currentTime - lastClickTime < 300) {
      return;
    }

    setLastClickTime(currentTime);
    const slider = sliderRef.current;

    if (slider) {
      const updatedChildren = [...children];

      if (direction === "left") {
        const lastChild = updatedChildren.pop();
        updatedChildren.unshift(lastChild);
      } else if (direction === "right") {
        const firstChild = updatedChildren.shift();
        updatedChildren.push(firstChild);
      }

      setChildren(updatedChildren);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/category");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      const slider = sliderRef.current;

      if (slider) {
        const sliderChildren = Array.from(slider.children);
        setChildren(sliderChildren);

        let translX = -332;
        sliderChildren.forEach((child, index) => {
          translX += 166;
          child.style.left = `${translX}px`;

          if (index === 0 || index === sliderChildren.length - 1) {
            child.style.visibility = "hidden";
          } else {
            child.style.visibility = "visible";
          }

          setTimeout(() => {
            child.style.transition = "all 0.4s ease-in-out";
          }, 400);
        });
      }
    }
  }, [categories]);

  useEffect(() => {
    children.forEach((child, index) => {
      const translX = -166 + index * 166;
      child.style.left = `${translX}px`;

      if (index === 0 || index === children.length - 1) {
        child.style.visibility = "hidden";
      } else {
        child.style.visibility = "visible";
      }
    });
  }, [children]);

  return (
    <div className="category_slider section__padding">
      <div className="category_slider-content">
        <h2>Znajdź interesującą cię tematykę</h2>
        <button
          onClick={() => handleScroll("left")}
          className="scroll-button left"
        >
          {"<"}
        </button>
        <div className="category_slider-content-categories">
          <div
            className="category_slider-content-categories-inside"
            ref={sliderRef}
          >
            {categories.map((category, index) => (
              <CategoryItem
                keyId={index}
                title={category.name}
                photo={photo1}
              />
            ))}
            <CategoryItem keyId={11} title="Artystyczne" photo={photo1} />
            <CategoryItem keyId={12} title="Kulinarne" photo={photo1} />
            <CategoryItem keyId={13} title="Sensoryczne" photo={photo1} />
            <CategoryItem keyId={14} title="Artystyczne" photo={photo1} />
            <CategoryItem keyId={15} title="Kulinarne" photo={photo1} />
            <CategoryItem keyId={16} title="Sensoryczne" photo={photo1} />
            <CategoryItem keyId={17} title="Artystyczne" photo={photo1} />
          </div>
        </div>
        <button
          onClick={() => handleScroll("right")}
          className="scroll-button right"
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Slider;
