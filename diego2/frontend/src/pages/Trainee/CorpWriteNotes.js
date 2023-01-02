import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const CorpWriteNotes = () => {
    const [notes, setNotes] = useState("");
   
     const { id1,id2 } = useParams();
    const handleSubmit = async (e) => {
      e.preventDefault();
      const notes1 =  notes ;
      console.log(notes1);
      const response = await axios.post(`/api/corporateTrainee/writenotes/${id1}/${id2}`, {Note: notes1});
      
  
      if (response.data) {
        console.log(response.data);
        alert("updated successfully")
      }
    };

    const handleDownloadNotes = async (e) => {

        const response = await axios.post(`/api/corporateTrainee/getuser/${id1}/${id2}`)
        alert("notes downloaded successfully")
    }

    return (
        <div>
        <form className="classForm" onSubmit={handleSubmit}>
          <h3> Notes </h3>
    
          <label>Type your notes here</label>
            <input
                 type="text"
                required
                //value={Password}
                 onChange={(e) => setNotes(e.target.value)}
             />
             
            <button>update</button>
          
            </form>
            <button onClick ={handleDownloadNotes}> Download your Notes </button>
        </div>
      );
    };
    
    

export default CorpWriteNotes;