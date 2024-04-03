import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Footer, Header } from "./containers";
import { Navbar } from "./components";
import video from "./assets/warsztaty_1.mp4";
import video2 from "./assets/warsztaty_2.mp4";
import "./App.css";
import LoginPage from "./pages/loginPage/LoginPage";
import Home from "./pages/home/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Workshops" />
        <Route path="/SingleWorkshop" />
        <Route path="/SingleWorkshop" />
      </Routes>
    </Router>
  );
}

export default App;
