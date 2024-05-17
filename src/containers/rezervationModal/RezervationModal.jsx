import React from "react";
import "./rezervationModal.css";
import { Calendar } from "../../components";

function RezervationModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <Calendar />
        <button>Potwierdź</button>
        <button onClick={onClose}>Zakmnij</button>
      </div>
    </div>
  );
}

export default RezervationModal;
