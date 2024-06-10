import React from "react";
import "./userReservationHistory.css";
import photo from "../../../assets/bg2.jpg";

function UserReservationHistory({ reservationInfo }) {
  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };
  console.log(reservationInfo);
  return (
    <div className="user_reservation_history">
      <hr />
      {reservationInfo ? (
        <>
          <h2>Historia rezerwacji</h2>
          <table className="reservation_table">
            <thead>
              <tr>
                <th> Warsztat</th>
                <th>Instruktor warsztatu</th>
                <th>Miejsce warsztatu</th>
                <th>Ilość dzieci</th>
                <th>Termin</th>
                <th>Koszt</th>
              </tr>
            </thead>
            <tbody>
              {reservationInfo.map((reservation) => (
                <tr key={reservation.id}>
                  <td>
                    <div className="workshopReservationInfo">
                      <img
                        src={
                          reservation.workshopBackgroundPhoto
                            ? `data:image/jpeg;base64,${reservation.workshopBackgroundPhoto}`
                            : photo
                        }
                        alt="Zdjęcie warsztatu"
                      />
                      <p>{reservation.workshopTitle}</p>
                    </div>
                  </td>
                  <td>{reservation.instructorEmail}</td>
                  <td>{reservation.place}</td>
                  <td>{reservation.kidsNumber}</td>
                  <td>
                    {new Date(
                      reservation.reservationDateTime
                    ).toLocaleDateString()}
                    {",  "}
                    {new Date(
                      reservation.reservationDateTime
                    ).toLocaleTimeString([], options)}
                  </td>
                  <td>{reservation.price} PLN</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <h2>Tutaj pojawi się historia twoich rezerwacji</h2>
      )}
    </div>
  );
}

export default UserReservationHistory;
