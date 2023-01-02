import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const IndPayCredit = () => {
    const [cardNo, setCardNo] = useState("");
    const [CVV, setCVV] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
   
     const { id1, id2 } = useParams();
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const response = await axios.post(`/api/individualTrainee/payonline/${id1}/${id2}`);
      
  
      if (response.data) {
        console.log(response.data);
        alert("updated successfully")
      }
    };

    return (
        <form className="classForm" onSubmit={handleSubmit}>
          <h3> Enter new Password </h3>
    
          <label>Enter your credit card number</label>
          <input
            type="text"
            required
            //value={Password}
            onChange={(e) => setCardNo(e.target.value)}
          />
          <br />
          <br />
        <label>Enter CVV</label>
          <input
            type="text"
            required
            //value={Password}
            onChange={(e) => setCVV(e.target.value)}
          />
          <br />
          <br />
        <label>Enter expiry date</label>
          <input
            type="text"
            required
            //value={Password}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
    <br />
        <br />

    
    
          
          
          
    
    
    
          <button> update </button>
        </form>
      );
    };
    
    

export default IndPayCredit;