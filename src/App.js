import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/loginPage/LoginPage";
import Home from "./pages/home/Home";
import WorkshopPage from "./pages/workshopPage/WorkshopPage";
import MyAccount from "./pages/myAccount/MyAccount";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/warsztat/:id" element={<WorkshopPage />} />
        <Route path="/twoje-konto" element={<MyAccount />} />
      </Routes>
    </Router>
  );
}

export default App;
