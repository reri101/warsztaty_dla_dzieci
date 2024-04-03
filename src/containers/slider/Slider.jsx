import React, { useEffect, useRef, useState } from "react";
import "./slider.css";
import { CategoryItem } from "../../components";
import photo1 from "../../assets/kids_workshop_background.jpg";

const Slider = () => {
  const sliderRef = useRef(null);
  const [children, setChildren] = useState([]);
  const [lastClickTime, setLastClickTime] = useState(0);

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
    const slider = document.querySelector(
      ".category_slider-content-categories-inside"
    );

    if (slider) {
      setChildren(Array.from(slider.children));

      let translX = -332;
      Array.from(slider.children).forEach((child, index) => {
        translX += 166;
        child.style.left = `${translX}px`;

        if (index === 0 || index === children.length - 1) {
          child.style.visibility = "hidden";
        } else {
          child.style.visibility = "visible";
        }

        setTimeout(() => {
          child.style.transition = "all 0.4s ease-in-out";
        }, 400);
      });
    }
  }, []);

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
          ←
        </button>
        <div className="category_slider-content-categories">
          <div
            className="category_slider-content-categories-inside"
            ref={sliderRef}
          >
            <CategoryItem title="Artystyczne" photo={photo1} />
            <CategoryItem title="Kulinarne" photo={photo1} />
            <CategoryItem title="Sensoryczne" photo={photo1} />
            <CategoryItem title="Artystyczne" photo={photo1} />
            <CategoryItem title="Kulinarne" photo={photo1} />
            <CategoryItem title="Sensoryczne" photo={photo1} />
            <CategoryItem title="Artystyczne" photo={photo1} />
            <CategoryItem title="Kulinarne" photo={photo1} />
            <CategoryItem title="Sensoryczne" photo={photo1} />
            <CategoryItem title="Artystyczne" photo={photo1} />
            <CategoryItem title="Kulinarne" photo={photo1} />
            <CategoryItem title="Sensoryczne" photo={photo1} />
          </div>
        </div>
        <button
          onClick={() => handleScroll("right")}
          className="scroll-button right"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default Slider;
