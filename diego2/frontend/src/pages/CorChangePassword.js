import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const CorChangePassword = () => {
    const [Password, setPassword] = useState("");
   
     const { id } = useParams();
    const handleSubmit = async (e) => {
      e.preventDefault();
      const password = { Password };
      const response = await axios.put(`/api/corporateTrainee/changepassword/${id}`, password);
      
  
      if (response.data) {
        console.log(response.data);
        alert("updated successfully")
      }
    };

    return (
        <form className="classForm" onSubmit={handleSubmit}>
          <h3> Enter new Password </h3>
    
          <label>new Password</label>
          <input
            type="text"
            required
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
    
          
    
    
          
          
          
    
    
    
          <button> update </button>
        </form>
      );
    };
    
    

export default CorChangePassword;