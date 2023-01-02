import axios from "axios";
import React from "react";
import { useState } from "react";

const SignUp = () => {
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Gender, setGender] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const Name = { FirstName, LastName };

    await axios.post("/api/individualTrainee/signup", {
      UserName,
      Password,
      Name,
      Gender,
    });
    window.location.href = `/Login`;
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      <label>UserName: </label>
      <input
        type="text"
        onChange={(e) => setUserName(e.target.value)}
        value={UserName}
      />

      <label>Password: </label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={Password}
      />

      <label>First Name: </label>
      <input
        type="text"
        onChange={(e) => setFirstName(e.target.value)}
        value={FirstName}
      />

      <label>Last Name: </label>
      <input
        type="text"
        onChange={(e) => setLastName(e.target.value)}
        value={LastName}
      />

      <label for="gender">Gender:</label>
      <select
        id="gender"
        name="gender"
        onChange={(e) => setGender(e.target.value)}
        value={Gender}
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <button>Sign Up</button>
    </form>
  );
};

export default SignUp;