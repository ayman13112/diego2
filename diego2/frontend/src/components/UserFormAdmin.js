import axios from "axios";
import { useState } from "react";

const UserFormAdmin = () => {
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { UserName, Password };
    const response = await axios.post(
      "/api/administrator/createadministrator",
      user
    );

    if (response.data) {
      console.log(response.data);
    }
  };

  return (
    <form className="userForm" onSubmit={handleSubmit}>
      <h3> Add new User </h3>

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

      <button> Add User </button>
    </form>
  );
};

export default UserFormAdmin;
