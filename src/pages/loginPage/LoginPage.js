import React from "react";
import { Login } from "../../containers";
import "./loginPage.css";

const LoginPage = () => {
  return (
    <div className="login_bg">
      <div className="login_page">
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
