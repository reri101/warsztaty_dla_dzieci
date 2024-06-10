import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/loginPage/LoginPage";
import Home from "./pages/Home/Home";
import Workshop from "./pages/Workshop/Workshop";
import UserProfile from "./pages/UserProfile/UserProfile";
import Admin from "./pages/Admin/Admin";
import { ContextProvider } from "./contexts/ContextProvider";
import Workshops from "./pages/Workshops/Workshops";
import EditAccoutn from "./pages/EditAccoutn/EditAccoutn";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile-info" element={<EditAccoutn />} />
        <Route path="/warsztaty" element={<Workshops />} />
        <Route path="/warsztat/:id" element={<Workshop />} />
        <Route path="/twoje-konto" element={<UserProfile />} />

        <Route
          path="/admin/*"
          element={
            <ContextProvider>
              <Admin />
            </ContextProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
