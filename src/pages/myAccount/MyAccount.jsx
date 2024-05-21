import React from "react";
import { Navbar } from "../../components";
import { UserDetails, Footer } from "../../containers";
import "./myAccount.css";

function MyAccount() {
  return (
    <div className="myaccount">
      <Navbar />
      <div className="myaccount__header"></div>
      <UserDetails />
      <Footer />
    </div>
  );
}

export default MyAccount;
