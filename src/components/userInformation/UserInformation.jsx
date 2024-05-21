import React from "react";
import Button from "../button/Button";
import jpg from "../../assets/joannaN.png";
import "./userInformation.css";

function UserInformation({ user }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="user_information">
      <div className="user_information--reservation_counter">
        <h2>{user.reservationCount}</h2>
        <p>Zamówienia</p>
      </div>
      <div className="user_information--personal_info">
        <div className="user_information--personal_info__avatar">
          <img src={jpg} alt="Avatar" />
        </div>
        <div className="user_information__details">
          <h1 className="user_information__name">
            {user.name} {user.lastname}
          </h1>
          <p className="user_information__email">
            {user.email} {user.phone}
          </p>
          <p className="user_information__location">{user.city}</p>
        </div>
      </div>
      <div className="user_information--logout">
        <Button text={"Wyloguj się"} onClick={handleLogout} />
      </div>
    </div>
  );
}

export default UserInformation;
