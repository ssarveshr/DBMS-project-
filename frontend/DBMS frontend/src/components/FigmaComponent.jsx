import React from "react";
import "./FigmaComponent.css"; // Import external CSS for better styling

const FigmaComponent = () => {
  return (
    <div className="login-container">
      <h1 className="welcome-text">
        Welcome to portal
      </h1>
      <h2 className="login-title">Login</h2>
      <p className="subtitle">Enter your account details</p>

      <label className="label">Username</label>
      <input type="text" className="input-field" placeholder="Enter your username" />

      <label className="label">Password</label>
      <input type="password" className="input-field" placeholder="Enter your password" />

      <p className="forgot-password">Forgot Password?</p>

      <button className="login-button">Login</button>
    </div>
  );
};

export default FigmaComponent;
