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
const RefundReqsInd = () => {

  const [indTrainees, setIndTrainees] = useState([]);
  const [corpTraineesUserName, setCorpTraineesUserName] = useState([]);
  // const params = new URLSearchParams(window.location.search);
  // const course_Id = params.get('course_Id');
  const { id } = useParams();
  console.log(id);


  const getIndTrainees = async () => {
    //await axios.get(`/viewreqtrainees/${id}?userId=${userId}`).then(
    await axios.get(`/api/administrator/viewrefund/${id}`).then(
      (res) => {
        // console.log(res);

        const corTrainees = res.data.y;
        //const corTraineesUserName = res.data;
        console.log(corTrainees)
        setIndTrainees(corTrainees)
       // setIndTrainees(corTraineesUserName)
      }
    );
  }

  const handleAccept = async (indTrainee) => {
    axios.post(`/api/administrator/acceptrefundone/${indTrainee._id}/${id}`)
    
  }

  const handleAcceptAll = async () => {
    axios.post(`/api/administrator/acceptrefund/${id}`)
    alert("users accepted successfully")
  }


  return (
    <div>
      <button onClick={getIndTrainees}>View Refund Requests</button>
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
            //   key={blog._id}
              onClick={handleAccept(indTrainee)}
              //key={corpTrainees[0]}
            >
              {/* <TableCell align="center">{corpTrainee.x}</TableCell> */}
              <TableCell align="center">{indTrainee.UserName}</TableCell>
              <TableCell align="center">{indTrainee._id}</TableCell>
            </TableRow>
           
          ))} 
        </TableBody>
      </Table>
      <button onClick ={() => window.location.href=`/courseAdministrator/${id}`}>Go back</button>
    </div>
    /* 
    1. create a button to load the blogs
    2. map over the blogs and display them
    */


  )
}

export default RefundReqsInd