import axios from "axios";
import { useState } from "react";

const UserFormAdmin = () => {
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { UserName, Password };
    const response = await axios.post(
      "/api/administrator/createcorporatetrainee",
      user
    );

    if (response.data) {
      console.log(response.data);
    }

    alert("Corporate trainee added successfully")

  };

  return (
    <form className="userForm" onSubmit={handleSubmit}>
      <h3> Add new corporate trainee </h3>

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

      <button> Add CorporateTrainee </button>

      <br />
      <br />
      <button onClick={()=>window.location.href=`/HomeAdministrator`}>Go back</button>
    </form>
  );
};

export default UserFormAdmin;
