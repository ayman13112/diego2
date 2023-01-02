import React from "react";
import axios from "axios";
import { useState } from "react";

const ForgetPass = () => {
  const [UserName, setUserName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.get(`/api/instructor/recive/${UserName}`);
    if (response.data) {
      console.log(response.data);
      alert("Email has been sent");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>UserName: </label>
        <input value={UserName} onChange={(e) => setUserName(e.target.value)} />
        <button type="submit">Send Email</button>
      </form>
    </div>
  );
};

export default ForgetPass;