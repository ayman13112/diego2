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
const CourseReqsCorp = () => {

  const [corpTrainees, setCorpTrainees] = useState([]);
  const [corpTraineesUserName, setCorpTraineesUserName] = useState([]);
  // const params = new URLSearchParams(window.location.search);
  // const course_Id = params.get('course_Id');
  const { id } = useParams();
  console.log(id);


  const getCorpTrainees = async () => {
    //await axios.get(`/viewreqtrainees/${id}?userId=${userId}`).then(
    await axios.get(`/api/administrator/viewreqtrainees/${id}`).then(
      (res) => {
        // console.log(res);

        const corTrainees = res.data.y;
        const corTraineesUserName = res.data;
        console.log(corTrainees)
        setCorpTrainees(corTrainees)
        setCorpTraineesUserName(corTraineesUserName)
      }
    );
  }

  const handleAccept = async () => {
    axios.post(`/api/administrator/acceptedTrainee/${id}`)
    alert("users accepted successfully")
  }

  const handleAcceptOne = async (corpTrainee) => {
    axios.post(`/api/administrator/acceptedTraineeone/${corpTrainee._id}/${id}`)    
    // alert("user accepted successfully")

  }
  return (
    <div>
      <button onClick={getCorpTrainees}>View Corporate Trainee Requests</button>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow >
            <StyledTableCell align="center">UserName</StyledTableCell>
            {/* <StyledTableCell align="center">Accept</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
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
              onClick={handleAcceptOne(corpTrainee)}
              // key={corpTrainees[0]}
            >
              {/* <TableCell align="center">{corpTrainee.x}</TableCell> */}
              <TableCell align="center">{corpTrainee}</TableCell>
              {/* { <TableCell align="center">{getCorpTrainee.body}</TableCell> } */}
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

export default CourseReqsCorp