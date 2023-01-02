import React, { useState } from "react";
import axios from "axios";
import "../styles/index.css";
import "../styles/navbar.css";
import Navbar from "../components/Navbar";

const Login = () => {
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post("/api/login", { UserName, Password });

    if (response.data.role === "individualTrainee") {
      window.location.href = `/individualTrainee/${response.data.user._id}`;
    }
    if (response.data.role === "instructor") {
      window.location.href = `/HomeInstructor/${response.data.user._id}`;
    }
    if (response.data.role === "administrator") {
      window.location.href = `/HomeAdministrator/${response.data.user._id}`;
    }

    if (response.data.role === "corporateTrainee") {
      window.location.href = `/corporateTrainee/${response.data.user._id}`;
    }
  };

  return (
    <div>
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>UserName: </label>
          <input
            type="text"
            onChange={(event) => setUserName(event.target.value)}
            value={UserName}
          />
          <label>Password: </label>
          <input
            type="Password"
            onChange={(event) => setPassword(event.target.value)}
            value={Password}
          />
          <button type="submit">Login</button>
        </form>
      </div>
      <button onClick={() => (window.location.href = "/forgetpass")}>
        Forgot password?
      </button>
    </div>
  );
};

export default Login;