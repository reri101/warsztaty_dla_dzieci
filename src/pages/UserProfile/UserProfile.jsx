import React from "react";
import { Navbar } from "../../components";
import { UserDetails, Footer } from "../../containers";
import "./userProfile.css";

function UserProfile() {
  return (
    <div className="myaccount">
      <Navbar />
      <div className="myaccount__header"></div>
      <UserDetails />
      <Footer />
    </div>
  );
}

export default UserProfile;
