import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import "./admin.css";
import { Navbar, Footer, Sidebar, ThemeSettings } from "../../components/Admin";
import {
  Ecommerce,
  Orders,
  Calendar,
  Employees,
  Stacked,
  Pyramid,
  Customers,
  Kanban,
  Line,
  Area,
  Bar,
  Pie,
  Financial,
  ColorMapping,
} from "./page";
import { useStateContext } from "../../contexts/ContextProvider";

function Admin() {
  const {
    activeMenu,
    themeSettings,
    setThemeSettings,
    currentColor,
    currentMode,
    setCurrentColor,
    setCurrentMode,
    setColor,
    setMode,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    } else {
      setColor({ currentColor });
      setMode({ currentThemeMode });
    }
  }, []);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
          <TooltipComponent content={"Settings"} position="Top">
            <button
              type="button"
              onClick={() => setThemeSettings(true)}
              style={{ background: currentColor, borderRadius: "50%" }}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <FiSettings />
            </button>
          </TooltipComponent>
        </div>
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        <div
          className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${
            activeMenu ? "md:ml-72" : "flex-2"
          }`}
        >
          <div className="flexed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
            <Navbar />
          </div>
          <div>
            {themeSettings && <ThemeSettings />}

            <Routes>
              <Route path="/" element={<Ecommerce />} />
              <Route path="/ecommerce" element={<Ecommerce />} />

              <Route path="/rezerwacje" element={<Orders />} />
              <Route path="/instruktorzy" element={<Employees />} />
              <Route path="/klienci" element={<Customers />} />

              <Route path="/kanban" element={<Kanban />} />
              <Route path="/kalendarz" element={<Calendar />} />
              <Route path="/liniowy" element={<Line />} />
              <Route path="/obszarowy" element={<Area />} />
              <Route path="/słupkowy" element={<Bar />} />
              <Route path="/kołowy" element={<Pie />} />
              <Route path="/finansowy" element={<Financial />} />
              <Route path="/mapowanie-kolorów" element={<ColorMapping />} />
              <Route path="/pyramid" element={<Pyramid />} />
              <Route path="/skumulowany" element={<Stacked />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
