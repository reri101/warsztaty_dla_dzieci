import React from "react";
import "./editAccoutn.css";
import { ProfileInformation } from "../../containers";

function EditAccoutn() {
  return (
    <div className="edit_acc">
      <div className="background_filter">
        <ProfileInformation />
      </div>
    </div>
  );
}

export default EditAccoutn;
