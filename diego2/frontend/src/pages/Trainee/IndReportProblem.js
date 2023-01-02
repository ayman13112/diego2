import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const IndReportProblem = () => {
    const [report, setReport] = useState("");
   
    const { id1,id2 } = useParams();
    const handleSubmit = async (e) => {
      e.preventDefault();
      const report1 =  report ;
      const response = await axios.post(`/api/individualTrainee/report/${id1}/${id2}`, 
      {"body":report1}
      );
      
  
      if (response.data) {
        console.log(response.data);
        alert("report sent successfully")
      }
    };

    return (
        <form className="classForm" onSubmit={handleSubmit}>
          <h3> Enter your reported problem </h3>
    
          <label>New Report</label>
          <input
            type="text"
            required
            //value={Password}
            onChange={(e) => setReport(e.target.value)}
          />
    
          <button> Send </button>
        </form>
      );
    };
    
    

export default IndReportProblem;