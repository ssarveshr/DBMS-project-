import React from "react";
import LoginPage from "./components/LoginPage.jsx";
import DashBoard from "./components/DashBoard.jsx";
import "./App.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashBoard/>} />
    </Routes>
  );
}
export default App;
