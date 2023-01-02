import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const CorpReportFollowUp = () => {

    const [course, setCourse] = useState([]);
    const [reporttype,setReporttype] = useState([]);
    const [status,setStatus] = useState([]);
    const [report,setReport] = useState([]);

    const { id1,id2 } = useParams();
    const fetchCourses = async () => {
        await axios
        .get(`/api/individualTrainee/FindCourseById/${id2}`)
        .then((res) => {
            // console.log(res.data[0]);
            setCourse(res.data[0]);
        });
        await axios
        .get(`/api/corporateTrainee/viewreporttype/${id1}/${id2}`)
        .then((res) => {
            console.log(res.data);
            setReporttype(res.data.z);
            setStatus(res.data.y);
        });
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(status[0]=="resolved" || status[0]=="Resolved")
        {
            alert("Problem is already solved")
        }
        else
        {
        const report1 =  report ;
        const response = await axios.post(`/api/corporateTrainee/report/${id1}/${id2}`, 
        {"body":report1}
        );
        
    
        if (response.data) {
          console.log(response.data);
          alert("report sent successfully")
        }
    }
      };

    useEffect(() => {
        fetchCourses();
    }, []);
    return (
        <div>
            <div className="row">
                {/* <button onClick={getReport}>Show Report</button> */}
                <label>{course.Title}</label>
                <br />
                <br />
                <label>Report: </label>
                <label>{reporttype}</label>
                <br />
                <br />
                <label>Status: </label>
                <label>{status}</label>
                <br />
                <br />
                
            </div>
            <form className="classForm" onSubmit={handleSubmit}>
                <h3> Follow up your problem</h3>
    
                <label>New Report</label>
                <input
                    type="text"
                    required
                    //value={Password}
                     onChange={(e) => setReport(e.target.value)}
                />
    
          <button> Send </button>
        </form>
        </div>
    )
}

export default CorpReportFollowUp;
