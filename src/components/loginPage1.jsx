import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner.jsx";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);

  const HandlerFunction = () => {
    const Data = { email, password };
    console.log(Data);
    setLoading(true);
    axios
      .post(`http://localhost:5000/api/auth/Student/login`, Data)
      .then((res) => {
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="relative w-full max-w-4xl bg-gray-900 p-8 rounded-lg shadow-lg flex flex-col md:flex-row gap-8">
        {/* Left side content */}
        <div className="flex-1 flex flex-col justify-center items-start">
          <div className="text-left mb-4">
            <p className="text-2xl font-bold">Welcome to</p>
            <p className="text-4xl font-extrabold text-blue-400">Student Portal</p>
          </div>
          <div className="flex gap-4 mt-6">
            <img className="w-10 h-10" alt="Union Icon" src="/union-1.svg" />
            <img className="w-10 h-10" alt="Union Icon 1" src="/union-2.svg" />
            <img className="w-10 h-10" alt="Union Icon 2" src="/union-3.svg" />
          </div>
          <img className="mt-8 w-48" src="/studentplug.svg" alt="Student" />
        </div>

        {/* Right side (form) */}
        <div className="flex-1 bg-white text-black p-6 rounded-lg shadow-md relative">
          {Loading && <Spinner />}
          <div className="text-center mb-6">
            <p className="text-2xl font-bold">Login</p>
            <p className="text-sm text-gray-500">Enter your account details</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={HandlerFunction}
          >
            Login
          </button>
          <div className="text-sm text-center text-blue-600 mt-4 cursor-pointer hover:underline">
            Forgot Password?
          </div>
        </div>
      </div>
    </div>
  );
};

export default loginPage1.jsx;
