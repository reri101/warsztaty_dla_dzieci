import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../../../components/Admin";
import { useNavigate } from "react-router-dom";

function InstructorForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    description: "",
    phone: "",
    city: "",
    hireDate: "",
    photo: null,
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 7000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { confirmPassword, photo, ...instructorData } = formData;

    if (instructorData.password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      console.log(instructorData);
      const registerResponse = await axios.post(
        "http://localhost:8080/api/auth/registerInstructor",
        instructorData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (registerResponse.status !== 200) {
        throw new Error("Failed to register instructor details");
      }

      const formDataToSend = new FormData();
      if (photo) {
        formDataToSend.append("photo", photo);
      }
      const email = instructorData.email;
      const uploadResponse = await axios.post(
        `http://localhost:8080/api/uploadPhoto/${email}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (uploadResponse.status !== 200) {
        throw new Error("Failed to upload profile photo");
      }

      navigate("/admin/instruktorzy");
    } catch (error) {
      console.error("Error registering instructor:", error);
      setErrorMessage("Wystąpił błąd. Spróbój ponownie.");
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="funkcjonalność" title="Dodaj Instruktora" />
      {errorMessage && (
        <div
          className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg"
          role="alert"
        >
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="md:flex md:gap-5 md:flex-wrap">
          <div className="mb-5 flex-1">
            <label
              htmlFor="firstName-input"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Imię
            </label>
            <input
              type="text"
              id="firstName-input"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          <div className="mb-5 flex-1">
            <label
              htmlFor="lastName-input"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Nazwisko
            </label>
            <input
              type="text"
              id="lastName-input"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          <div className="mb-5 flex-1">
            <label
              htmlFor="email-input"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              id="email-input"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-5 flex-1">
            <label
              htmlFor="phone-input"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Telefon
            </label>
            <input
              type="text"
              id="phone-input"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
        </div>

        <div className="md:flex md:gap-5 md:flex-wrap">
          <div className="mb-5 flex-1">
            <label
              htmlFor="password-input"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Hasło
            </label>
            <input
              type="password"
              id="password-input"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-5 flex-1">
            <label
              htmlFor="confirmPassword-input"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Powtórz hasło
            </label>
            <input
              type="password"
              id="confirmPassword-input"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
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
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Dodaj opis..."
          ></textarea>
        </div>

        <div className="mb-5">
          <label
            htmlFor="city-input"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Miasto
          </label>
          <input
            type="text"
            id="city-input"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
          <div
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="user_avatar_help"
          >
            Miasto w którego okolicy instruktor będzie wykonywał warsztaty
          </div>
        </div>

        <div className="mb-5">
          <label
            htmlFor="hireDate-input"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Data zatrudnienia
          </label>
          <input
            type="date"
            id="hireDate-input"
            name="hireDate"
            value={formData.hireDate}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="instructorPhoto"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Zdjęcie profilowe
          </label>
          <input
            type="file"
            id="instructorPhoto"
            name="photo"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="user_avatar_help"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Dodaj Instruktora
          </button>
        </div>
      </form>
    </div>
  );
}

export default InstructorForm;
