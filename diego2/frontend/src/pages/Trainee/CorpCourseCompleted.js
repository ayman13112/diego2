import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const CorpCourseCompleted = () => {

    const [course, setCourse] = useState([]);
    const [reporttype,setReporttype] = useState([]);
    const [status,setStatus] = useState([]);

    const { id } = useParams();
    const handleSendMail = async () => {
        axios.post(`/api/corporateTrainee/f/${id}`)
        
        alert("mail sent successfully")
        
    };

    // useEffect(() => {
    //     fetchCourses();
    // }, []);
    return (
        <div>
            <div className="row">

                <button onClick={handleSendMail}>Send certificate via email</button>
                
            </div>
        </div>
    )
}

export default CorpCourseCompleted;
