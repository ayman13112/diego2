import axios from "axios";
import { useState } from "react";

const UserFormAdmin = () => {
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { UserName, Password };
    const response = await axios.post(
      "/api/administrator/createInstructor",
      user
    );

    if (response.data) {
      console.log(response.data);
    }
    alert("Instructor added successfully")
  };

  return (
    <form className="userForm" onSubmit={handleSubmit}>
      <h3> Add new instructor</h3>

      <label>UserName</label>
      <input
        type="text"
        required
        value={UserName}
        onChange={(e) => setUserName(e.target.value)}
      />

      <label>Password</label>
      <input
        type="text"
        required
        value={Password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button> Add Instructor </button>
      <br />
      <br />
      <button onClick={()=>window.location.href=`/HomeAdministrator`}>Go back</button>
    </form>
  );
};

export default UserFormAdmin;
