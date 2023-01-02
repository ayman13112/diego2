import axios from 'axios';
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const { useState } = require("react");
const ViewReportedProblem = () => {

  const [corpTrainees, setCorpTrainees] = useState([]);
  const [corpTraineesUserName, setCorpTraineesUserName] = useState([]);
  const [indTrainees, setIndTrainees] = useState([]);
  const [indTraineesUserName, setIndTraineesUserName] = useState([]);
  // const params = new URLSearchParams(window.location.search);
  // const course_Id = params.get('course_Id');
  let { id } = useParams();
  console.log(id);
  console.log(indTrainees[0]);

  const getIndTrainees = async () => {
    //await axios.get(`/viewreqtrainees/${id}?userId=${userId}`).then(
    await axios.get(`/api/administrator/Indviewproblem/${id}`).then(
      (res) => {
        // console.log(res);

        const indTrainees = res.data.Inds;
        const indTraineesUserName = res.data;
        console.log(indTrainees)
        setIndTrainees(indTrainees)
        setIndTraineesUserName(indTraineesUserName)
      }
    );
  }

  const getCorpTrainees = async () => {
    //await axios.get(`/viewreqtrainees/${id}?userId=${userId}`).then(
    await axios.get(`/api/administrator/Corviewproblem/${id}`).then(
      (res) => {
        // console.log(res);

        const corTrainees = res.data.Corps;
        const corTraineesUserName = res.data;
        console.log(corTrainees)
        setCorpTrainees(corTrainees)
        setCorpTraineesUserName(corTraineesUserName)
      }
    );
  }

  const getTrainees = async () => {
    getIndTrainees();
    getCorpTrainees();
  }

  const handleAccept = async () => {
    axios.post(`/api/administrator/acceptedTrainee/${id}`)
    alert("users accepted successfully")
  }

//   const handleViewReportInd = async (indTrainee) => {
//     //axios.get(`/api/administrator/${indTrainee._id}/${id}`)
//     window.location.href=`/IndReportPage/${indTrainee._id}/${id}`
//     // <IndReportPage />
//   }

  return (
    <div>
      <button onClick={getTrainees}>View Trainee Reports</button>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow >
            <StyledTableCell align="center">UserName</StyledTableCell>
            <StyledTableCell align="center">Id</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {indTrainees.map((indTrainee) => (
            <TableRow
              hover
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  backgroundColor: "#f5f5f5",
                  width: "100%"
                }
              }}
            // onClick={() => window.location.href=`/filter?userId=${userId}`}
            //  key={blog._id}
              //onClick={handleViewReportInd(indTrainee)}
             onClick ={() => window.location.href=`/IndReportPage?indTrainee=${indTrainee._id}&id=${id}`}
             //a href=`/IndReportPage/${indTrainee._id}/${id}
              //key={corpTrainees[0]}
              key={indTrainee._id}

            >
              {/* <TableCell align="center">{corpTrainee.x}</TableCell> */}
              <TableCell align="center">{indTrainee.UserName}</TableCell>
              <TableCell align="center">{indTrainee._id}</TableCell>
            </TableRow>
           
          ))} 
          {corpTrainees.map((corpTrainee) => (
            <TableRow
              hover
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  backgroundColor: "#f5f5f5",
                  width: "100%"
                }
              }}
            // onClick={() => window.location.href=`/filter?userId=${userId}`}
            //   key={blog._id}
              // onClick={() =>axios.get(`/api/administrator/acceptedTrainee/${id}`)}
              // key={corpTrainees[0]}
              onClick ={() => window.location.href=`/CorpReportPage?corpTrainee=${corpTrainee._id}&id=${id}`}
             //a href=`/IndReportPage/${indTrainee._id}/${id}
              //key={corpTrainees[0]}
              key={corpTrainee._id}
            >
              {/* <TableCell align="center">{corpTrainee.x}</TableCell> */}
              <TableCell align="center">{corpTrainee.UserName}</TableCell>
              <TableCell align="center">{corpTrainee._id}</TableCell>
            </TableRow>
           
          ))} 
        </TableBody>
      </Table>
      <button onClick={handleAccept}>Accept all</button>
      <br />
      <button onClick ={() => window.location.href=`/courseAdministrator/${id}`}>Go back</button>

    </div>
    /* 
    1. create a button to load the blogs
    2. map over the blogs and display them
    */


  )
}

export default ViewReportedProblem