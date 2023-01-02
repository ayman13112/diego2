import axios from 'axios';
const { useState } = require("react");

const IndReportPage = () =>
{
  const [report, setReport] = useState("");
  const [status, setStatus] = useState("");
  const params = new URLSearchParams(window.location.search);
  const indTrainee=params.get('indTrainee');
  const id=params.get('id');

    
  const getReport = async () => {
    //await axios.get(`/viewreqtrainees/${id}?userId=${userId}`).then(
    await axios.get(`/api/administrator/Indviewproblemtype/${indTrainee}/${id}`).then(
      (res) => {
        // console.log(res);

        const report1 = res.data.z;
        
        console.log(report1)
        setReport(report1)
      }
    );
    await axios.get(`/api/individualTrainee/getStatus/${indTrainee}/${id}`).then(
      (res) => {
        // console.log(res);

        const report1 = res.data;
        
        console.log(report1)
        setStatus(report1)
      }
    );
  }

  const setResolvedStatus = async () => {
    axios.post(`/api/administrator/resolved/${indTrainee}/${id}`)
    setStatus("Resolved");
  }

  const setPendingStatus = async () => {
    axios.post(`/api/administrator/pending/${indTrainee}/${id}`)
    if(status!=="Resolved" && status!=="resolved")
    {
      setStatus("Pending");
    }
    else{
      alert("You already resolved it");
    }
  }

  return(
    <div>
      <label>hello</label>
      <br />
      <button onClick={getReport}>Click</button>
      <br />
      <button onClick={setResolvedStatus}>Resolve</button>
      <br />
      <button onClick={setPendingStatus}>Pending</button>
      <br />
      <label>{report}</label>
      <br />
      <label>{status}</label>
      <br />
      <button onClick ={() => window.location.href=`/ViewReportedProblem/${id}`}>Go back</button>
    </div>
  )
}
export default IndReportPage