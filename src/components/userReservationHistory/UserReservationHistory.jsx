import React from "react";
import "./userReservationHistory.css";
import photo from "../../assets/bg2.jpg";

function UserReservationHistory() {
  const reservations = [
    {
      id: 1,
      workshopName: "Warsztaty malowania",
      workshopInstructor: "Anna Kowalska",
      workshopImage: photo,
      location: "Kraków",
      childrenCount: 28,
      startTime: "10:00",
      cost: 650,
    },
    {
      id: 2,
      workshopName: "Warsztaty malowania",
      workshopInstructor: "Anna Kowalska",
      workshopImage: photo,
      location: "Kraków",
      childrenCount: 20,
      startTime: "10:00",
      cost: 590,
    },
    {
      id: 3,
      workshopName: "Warsztaty malowania",
      workshopInstructor: "Anna Kowalska",
      workshopImage: photo,
      location: "Kraków",
      childrenCount: 22,
      startTime: "10:00",
      cost: 470,
    },
  ];

  return (
    <div className="user_reservation_history">
      <hr />
      <h2>Historia rezerwacji</h2>
      <table className="reservation_table">
        <thead>
          <tr>
            <th>Nazwa warsztatu</th>
            <th>Zdjęcie główne</th>
            <th>Instruktor warsztatu</th>
            <th>Miejsce warsztatu</th>
            <th>Ilość dzieci</th>
            <th>Godzina rozpoczęcia</th>
            <th>Koszt</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>
                <p>{reservation.workshopName}</p>
              </td>
              <td>
                <img src={reservation.workshopImage} alt="Zdjęcie warsztatu" />
              </td>
              <td>{reservation.workshopInstructor}</td>
              <td>{reservation.location}</td>
              <td>{reservation.childrenCount}</td>
              <td>{reservation.startTime}</td>
              <td>{reservation.cost} PLN</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserReservationHistory;
