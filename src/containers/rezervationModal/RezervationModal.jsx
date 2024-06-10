import React, { useState } from "react";
import "./rezervationModal.css";
import { Calendar, ReservationConfirmation } from "../../components";
import axios from "axios";
import { set } from "date-fns";

function RezervationModal({ workshop, onClose, userId }) {
  const [selectedDate, setSelectedDate] = useState({
    justDate: null,
    dateTime: null,
  });
  const [dateTimeConfirmed, setDateTimeConfirmed] = useState(false);
  const [childrenCount, setChildrenCount] = useState(0); // Domyślna liczba dzieci
  const [selectedWorkshopArea, setSelectedWorkshopArea] = useState("");
  const [notes, setNotes] = useState("");

  const handleConfirm = () => {
    if (
      childrenCount > 0 &&
      childrenCount < workshop.maxGroup + 8 &&
      selectedDate.dateTime
    ) {
      console.log("Selected date:", selectedDate);
      setDateTimeConfirmed(true);
    } else {
      alert(
        "Proszę o podanie wszystkich informacji takich jak liczba dzieci, wybrane miejsce warsztatu, data oraz czas."
      );
    }
  };

  const handleBack = () => {
    setDateTimeConfirmed(false);
    setSelectedDate({ justDate: null, dateTime: null });
  };

  const handleReservation = async () => {
    try {
      console.log(workshop);
      const response = await axios.post(
        "http://localhost:8080/api/reservation/create",
        {
          place: selectedWorkshopArea,
          kidsNumber: childrenCount,
          durationMinutes: workshop.duration,
          price:
            childrenCount >= workshop.minGroupForDiscounting
              ? workshop.pricePerChildDiscounted
              : workshop.pricePerChild,
          reservationDateTime: selectedDate.dateTime.toISOString(),
          userId: userId,
          workshopId: workshop.id,
          instructorId: workshop.instructors[0].id,
          notes: notes,
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert("Rezerwacja zakończona sukcesem!");
        onClose();
      } else {
        console.error("Błąd podczas wysyłania rezerwacji:", response.status);
        alert("Wystąpił błąd podczas rezerwacji. Proszę spróbować ponownie.");
      }
    } catch (error) {
      console.error("Błąd podczas wysyłania rezerwacji:", error);
      alert("Wystąpił błąd podczas rezerwacji. Proszę spróbować ponownie.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="close_area">
          {dateTimeConfirmed ? (
            <>
              <button onClick={handleBack}>
                <b>{"<"} Powrót</b>
              </button>
              <button onClick={onClose}>
                <b>X</b>
              </button>
            </>
          ) : (
            <button className="closeBtn" onClick={onClose}>
              <b>X</b>
            </button>
          )}
        </div>
        {dateTimeConfirmed ? (
          <div className="reservation-info">
            <ReservationConfirmation
              workshop={workshop}
              selectedDate={selectedDate}
              childrenCount={childrenCount}
              selectedWorkshopArea={selectedWorkshopArea}
              notes={notes}
              setNotes={setNotes}
            />
            <button className="confirmBtn" onClick={handleReservation}>
              Zarezerwuj
            </button>
          </div>
        ) : (
          <>
            <h2>Wybierz termin warsztatu</h2>
            <Calendar
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            <h3>Podaj szczegóły</h3>
            <div className="specyficData">
              <div>
                <label htmlFor="childrenCount">Liczba dzieci:</label>
                <input
                  type="number"
                  id="childrenCount"
                  value={childrenCount}
                  onChange={(e) => setChildrenCount(parseInt(e.target.value))}
                />
              </div>

              <div className="workshopPlace_container">
                <label htmlFor="workshopArea">
                  Dokładny ares Państwa placówki:
                </label>
                <textarea
                  type="text"
                  id="workshopArea"
                  value={selectedWorkshopArea}
                  onChange={(e) => setSelectedWorkshopArea(e.target.value)}
                />
              </div>
            </div>
            <button className="confirmBtn" onClick={handleConfirm}>
              Potwierdź
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default RezervationModal;
