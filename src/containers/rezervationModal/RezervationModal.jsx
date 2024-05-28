import React from "react";
import "./rezervationModal.css";
import { Calendar } from "../../components";

function RezervationModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="close_area">
          <button onClick={onClose}>Zakmnij</button>
        </div>
        <h2>Wybierz termin warsztatu</h2>
        <Calendar />
        <button className="confirmBtn">Potwierdź</button>
      </div>
    </div>
  );
}

export default RezervationModal;
