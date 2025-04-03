import React, { useState } from "react";
import "./FigmaComponent.css";

const FigmaComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", { username, password });
    // Add authentication logic here
  };
  <p style={{ lineHeight: "0.4" }}>
</p>

  return (
    <div className="login-container">
        <div className="black-box">
            <div className="purple-box">
                <h1 className="fig1"></h1>
                <h1 className="welcome-text"style={{ lineHeight: "58px" }}>Welcome to </h1>
                <h1 className="portalname"style={{ lineHeight: "58px" }}>Student Portal</h1>
            </div>
            <div className="login-right">
      <h2 className="login-title" style={{ lineHeight: "0.00003" }}>Login</h2>
      <p className="subtitle" style={{ lineHeight: "0.0000000004" }}>Enter your account details</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username" className="block text-left label" style={{ lineHeight: "0.8", textAlign: "left" }}>Username</label>
        <input
          type="text"
          id="username"
          className="input-field"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password" className="label" style={{ lineHeight: "0.8", textAlign: "left" }}>Password</label>
        <input
          type="password"
          id="password"
          className="input-field"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          style={{ textAlign: "left" }}
        />

        <p className="forgot-password" style={{ lineHeight: "0.8" , textAlign: "left"}}>Forgot Password?</p>

        <button type="submit" className="login-button">Login</button>
      </form>
      </div>
      </div>
    </div>
  );
};

export default FigmaComponent;

