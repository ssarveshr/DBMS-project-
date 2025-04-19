import React from "react";
import LoginPage from "./components/LoginPage.jsx";
import DashBoard from "./components/DashBoard.jsx";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashBoard/>} />
    </Routes>
  );
}
export default App;





/* import LoginPage from "./components/LoginPage.jsx";
import "./App.css";

function App() {
  return (
    <>
      <div class = 'app'>
        <LoginPage />
      </div>
    </>
  );
}
export default App; */