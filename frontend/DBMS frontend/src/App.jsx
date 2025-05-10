import React from "react";
import LoginPage from "./components/LoginPage.jsx";
import SignupPage from "./components/SignUpPage.jsx"
import DashBoard from "./components/DashBoard.jsx";
import LoginFaculty from "./components/LoginFaculty.jsx";
import SignUpFaculty from "./components/SignUpFaculty.jsx";
import About from "./components/About.jsx";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/HomePage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage/>}/>
      <Route path="/loginfaculty" element={<LoginFaculty/>} />
      <Route path="/signupfaculty" element={<SignUpFaculty/>} />
      <Route path="/dashboard" element={<DashBoard/>} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
export default App;

