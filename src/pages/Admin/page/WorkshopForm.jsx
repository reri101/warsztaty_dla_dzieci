import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../../../components/Admin";
import { useNavigate } from "react-router-dom";

const WorkshopForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    holidayId: "",
    categoryId: "",
    duration: 45,
    pricePerChild: "",
    pricePerChildDiscounted: "",
    minGroupForDiscounting: 20,
    maxAge: 16,
    maxGroup: 30,
    workshopArea: "",
    instructorId: "",
    backgroundPhoto: null,
    photos: [],
  });
  const [categories, setCategories] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [workshopId, setWorkshopId] = useState(-1);
  const [errorMessage, setErrorMessage] = useState(null);
  const [cityError, setCityError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const response = await axios.get(
          "http://localhost:8080/api/instructors",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setInstructors(response.data);
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "pricePerChild" ||
        name === "pricePerChildDiscounted" ||
        name === "categoryId" ||
        name === "instructorId"
          ? parseInt(value) || ""
          : value,
    });
    if (name === "workshopArea") {
      setCityError("");
    }
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setFormData({
      ...formData,
      [name]: file,
    });
  };

  const handleMultipleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      photos: files,
    });
  };

  const geocodePlace = async (placeName) => {
    try {
      console.log(placeName);
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: {
            q: placeName,
            format: "json",
          },
        }
      );
      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        return { lat, lon };
      } else {
        setCityError("Miasto nie zostało znalezione");
        setErrorMessage("Miasto nie zostało znalezione");
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      setErrorMessage("Błąd geokodowania: " + error.message);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { backgroundPhoto, photos, ...workshopData } = formData;
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      console.log(workshopData);
      geocodePlace(workshopData.workshopArea);
    } catch (error) {
      console.error(error);
    } finally {
      try {
        const newworkshop = await axios.post(
          "http://localhost:8080/api/workshop/create",
          workshopData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(newworkshop.data.id);
        setWorkshopId(newworkshop.data.id + 1);
      } catch (error) {
        console.error(error);
      } finally {
        const formDataToSend = new FormData();
        formDataToSend.append("backgroundPhoto", backgroundPhoto);
        photos.forEach((photo) => formDataToSend.append("photos", photo));

        console.log(workshopId);
        await axios.post(
          `http://localhost:8080/api/workshop/${workshopId}/addphotos`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="funkcjonalność" title="Dodaj Warsztat" />
      {errorMessage && (
        <div
          className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg"
          role="alert"
        >
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="title-input"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Tytuł
          </label>
          <input
            type="text"
            id="title-input"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="np Las w słoiku..."
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="description-input"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Opis
          </label>
          <textarea
            id="description-input"
            rows="4"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Dodaj opis..."
            required
          ></textarea>
        </div>

        <div className="mb-5">
          <label
            htmlFor="instructor-input"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Instruktor
          </label>

          <select
            name="instructorId"
            id="instructor-input"
            value={formData.instructorId}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          >
            <option value="">Wybierz instruktora...</option>
            {instructors.map((instructor) => (
              <option key={instructor.id} value={instructor.id}>
                {instructor.firstName} {instructor.lastName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-5">
          <label
            htmlFor="category-input"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Kategoria
          </label>

          <select
            name="categoryId"
            id="category-input"
            value={formData.categoryId}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          >
            <option value="">Wybierz kategorie...</option>
            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
                className="bg-gray-50 text-gray-900"
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between flex-wrap">
          <div className="mb-5">
            <label
              htmlFor="duration-input"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Czas trwania (w minutach)
            </label>
            <input
              type="number"
              id="duration-input"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="pricePerChild-input"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Cena za dziecko
            </label>
            <input
              type="number"
              id="pricePerChild-input"
              name="pricePerChild"
              value={formData.pricePerChild}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="pricePerChildDiscounted-input"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Cena ze zniżką za dziecko
            </label>
            <input
              type="number"
              id="pricePerChildDiscounted-input"
              name="pricePerChildDiscounted"
              value={formData.pricePerChildDiscounted}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="minGroupForDiscounting-input"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Minimalna grupa na zniżkę
            </label>
            <input
              type="number"
              id="minGroupForDiscounting-input"
              name="minGroupForDiscounting"
              value={formData.minGroupForDiscounting}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="maxAge-input"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Maksymalny wiek
            </label>
            <input
              type="number"
              id="maxAge-input"
              name="maxAge"
              value={formData.maxAge}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="maxGroup-input"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Maksymalna grupa
            </label>
            <input
              type="number"
              id="maxGroup-input"
              name="maxGroup"
              value={formData.maxGroup}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mb-5">
          <label
            htmlFor="workshopArea-input"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Miasto (i okolice) w którym przeprowadzany będzie warszat
          </label>
          <input
            type="text"
            id="workshopArea-input"
            name="workshopArea"
            value={formData.workshopArea}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="np Łódź..."
            required
          />
          {cityError && (
            <div
              className="mt-1 text-sm text-red-500 dark:text-red-300"
              id="user_avatar_help"
            >
              {cityError}
            </div>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="background_photo"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Zdjęcie tła
          </label>
          <input
            type="file"
            id="background_photo"
            name="backgroundPhoto"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="user_avatar_help"
            required
          />
          <div
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="user_avatar_help"
          >
            Zdjęcie które będzie jako tło na stronie warsztatu
          </div>
        </div>

        <div className="mb-5">
          <label
            htmlFor="additional_photos"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Zdjęcie warsztatu
          </label>
          <input
            type="file"
            id="additional_photos"
            name="photos"
            multiple
            onChange={handleMultipleFileChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Workshop
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorkshopForm;
