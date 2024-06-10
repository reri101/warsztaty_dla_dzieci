import React from "react";
import "./reservationConfirmation.css";

function ReservationConfirmation({
  workshop,
  selectedDate,
  childrenCount,
  selectedWorkshopArea,
  notes,
  setNotes,
}) {
  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };
  return (
    <div>
      <h2>Podsumowanie</h2>
      <h3>Zarezerwowana data</h3>
      <p>
        Warsztat zarezerwowany na dzień:{" "}
        {selectedDate.justDate.toLocaleDateString()}
        <br />
        Godzinę: {selectedDate.dateTime.toLocaleTimeString([], options)}
      </p>
      <h3>Dane warsztatu: </h3>
      <p>Tytuł warsztatu: {workshop.title}</p>
      <p>Miejsce warsztatu: {selectedWorkshopArea}</p>
      <p>Czas trwania: {workshop.duration} minut</p>
      <p>Liczba dzieci: {childrenCount}</p>
      <p>
        Cena:{" "}
        {childrenCount >= workshop.minGroupForDiscounting
          ? workshop.pricePerChildDiscounted
          : workshop.pricePerChild}{" "}
        zł za dziecko
      </p>
      <p>
        Łącznie{" "}
        {childrenCount >= workshop.minGroupForDiscounting
          ? workshop.pricePerChildDiscounted * childrenCount
          : workshop.pricePerChild * childrenCount}
        {" zł"}
      </p>
      <h3>Uwagi</h3>
      <label id="notesAreaInput" htmlFor="notesArea">
        Dodaj uwagi do rezerwacji (Opcjonalnie):
      </label>
      <textarea
        type="text"
        id="notesArea"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
    </div>
  );
}

export default ReservationConfirmation;
