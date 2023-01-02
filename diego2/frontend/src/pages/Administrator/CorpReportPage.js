import axios from 'axios';
const { useState } = require("react");

const CorpReportPage = () =>
{
  const [report, setReport] = useState("Click the above button to show the report");
  const [status, setStatus] = useState("");
  const [showReport, setShowReport] = useState();
  const params = new URLSearchParams(window.location.search);
  const corpTrainee=params.get('corpTrainee');
  const id=params.get('id');

    
  const getReport = async () => {
    //await axios.get(`/viewreqtrainees/${id}?userId=${userId}`).then(
    await axios.get(`/api/administrator/Corviewproblemtype/${corpTrainee}/${id}`).then(
      (res) => {
        // console.log(res);

        const report1 = res.data.z;
        
        console.log(report1)
        setReport(report1)
      }
    );
    await axios.get(`/api/corporateTrainee/getStatus/${corpTrainee}/${id}`).then(
        (res) => {
          // console.log(res);
  
          const report1 = res.data;
          
          console.log(report1)
          setStatus(report1)
        }
      );
    setShowReport(!showReport);
  }

  const setResolvedStatus = async () => {
    axios.post(`/api/administrator/corresolved/${corpTrainee}/${id}`)
    setStatus("Resolved");
  }

  const handleShowReport = () => {
    setShowReport(!showReport);
  };

  const setPendingStatus = async () => {
    axios.post(`/api/administrator/corpending/${corpTrainee}/${id}`)
    if(status!=="Resolved")
    {
      setStatus("Pending");
    }
    else{
      alert("You already resolved it");
    }
  }

  return(
    <div>
    <button onClick={getReport}>
        {showReport == true
        ? "show Report !"
        : "show Report ? "}
    </button>
        <br />
        <label>{report}</label>
        
        {showReport == true ? (
            <div>
                
                {/* <button onClick={getReport}>Click</button> */}
                <label>{status}</label>
                <br />
                <button onClick={setResolvedStatus}>Resolve</button>
                <br />
                <button onClick={setPendingStatus}>Pending</button>
                <br />
                
                
                
            </div>
        ) : (
        <div></div>
        )}
       
        <br />
        <button onClick ={() => window.location.href=`/ViewReportedProblem/${id}`}>Go back</button>
    </div>
  )
}
export default CorpReportPage