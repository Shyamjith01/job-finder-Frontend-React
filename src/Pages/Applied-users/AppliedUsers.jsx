import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import React, { useEffect, useState } from "react";
import DoneIcon from '@mui/icons-material/Done';
import { useSelector } from "react-redux";
import { Router, useNavigate, useParams } from "react-router";

const AppliedUsers = () => {
  const [appliedUsers, setappliedUsers] = useState([]);
  const [job, setjob] = useState({});
  const navigate = useNavigate();

  const { id } = useParams();
  const token = useSelector((state) => state.user.token) || JSON.parse(localStorage.getItem("token"));

  const fetchUsers = () => {
    axios
      .get(`${process.env.REACT_APP_APIURL}/jobs/applied-users/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => { 
        setappliedUsers(resp.data.users);
        setjob(resp.data.job);
      })
      .catch((err) => {
        console.log(err, "Error");
      });
  };

  const changeDateFormat = (jobDate) => { 
    const m = new Date(jobDate);
    const month = m.toLocaleString("default", { month: "short" });
    const day = m.getDate();
    const date = `${month} ${day}`; 
    return date;
  };

  const handleResumeDownload=(id,name)=>{

    axios.get(`${process.env.REACT_APP_APIURL}/jobs/download-resume/${id}`,{
      headers:{
        'Content-Type':'multipart/form-data',
        "Authorization":`Bearer ${token}`
      },
      responseType:'blob'
    })
    .then(async resp=>{
      const blob = new Blob([resp.data],{ type: 'application/pdf' })

      const url = window.URL.createObjectURL(new Blob([blob]));

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download',`${name}.pdf`);
      document.body.appendChild(link);
      link.click()  ;


      handleChangeStatus(id,'reviewd');
    }).catch((err)=>{
      console.log(err,"errorr...");
    })
  }

  const handleChangeStatus=async(id,status)=>{ 
    const payload = {
      _id:id,
      status:status
    }
    axios.put(`${process.env.REACT_APP_APIURL}/jobs/applied-job/status`,payload,{
      headers:{
        'Content-Type':'application/json',
        "Authorization":`Bearer ${token}`
      }
    }).then((resp)=>{
      console.log(resp,"response");
    }).catch((err)=>{
      console.log(err,"Error");
    })
    if(status === "rejected"){
      const applied = await appliedUsers.map((data)=>{
        if(id === data._id){
          data.status = 'rejected'; 
        }
        return data;
      });
      setappliedUsers(applied); 
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container maxWidth="lg">
      <div
        className="jobss"
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px 20px",
          marginTop: "1rem",
          borderRadius: "10px",
          border: "1px solid #E4E2E0",
          textAlign: "start",
          flexDirection: "column",
        }}
      >
        <div
          className="left"
          style={{
            display: "flex",
            flexDirection: "column",
            cursor: "pointer",
          }}
          onClick={() => navigate(`/applied-users/${job._id}`)}
        >
          <h3 className="jobTitle" style={{ margin: "0" }}>
            {job.jobTitle}
          </h3>
          <span style={{ padding: "5px 0" }} className="Companyname">
            {job.companyName}
          </span>
          <span style={{ padding: "5px 0" }}>{job.location}</span>
          <span
            style={{
              padding: "5px 0",
              fontSize: "11px",
              color: "#7C7C7C",
            }}
          >
            Posted on {changeDateFormat(job.createdAt)}
          </span>
        </div>
        <div className="users">
          <h2>Users</h2>
          <TableContainer component={Paper}>
            <Table size="large" aria-label="a dense table">
              <TableHead sx={{ fontFamily: "sans-serif" }}>
                <TableRow>
                  <TableCell sx={{ fontFamily: "sans-serif" }}>
                    User name
                  </TableCell>
                  <TableCell sx={{ fontFamily: "sans-serif" }}>
                    Previous company name
                  </TableCell>
                  <TableCell sx={{ fontFamily: "sans-serif" }}>
                    Year of experience
                  </TableCell>
                  <TableCell sx={{ fontFamily: "sans-serif" }}>
                    Resume
                  </TableCell>
                  <TableCell sx={{ fontFamily: "sans-serif" }} align="center">
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appliedUsers.length !==0 && appliedUsers.map((row) => {
                  return (
                    <TableRow>
                      <TableCell sx={{ fontFamily: "sans-serif" }}>
                        {row.user.firstName}  {row.user.lastName}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "sans-serif" }}>
                      {row.prevCompany}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "sans-serif" }}>
                      {row.prevExperience}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "sans-serif" }}>
                        <Button sx={{fontSize:'10px'}} variant={'outlined'} disabled={row.status=='rejected'} onClick={()=>handleResumeDownload(row._id,row.user.firstName)}>Download</Button>
                      </TableCell>
                      <TableCell sx={{ fontFamily: "sans-serif",width:'12rem',textAlign:'center' }}>
                        {
                          row.status === 'rejected' && (<span style={{color:'#d32f2f',textShadow:'0px 0px 1.1px rgb(211, 47, 47)'}}>Rejected</span>)
                        }
                        {
                          row.status ==='pending' && (<><Button sx={{fontSize:'10px',marginRight:'4px'}} variant={'outlined'} color="error" onClick={()=>handleChangeStatus(row._id,'rejected')}><CloseIcon sx={{fontSize:"10px",paddingRight:"5px"}} />Reject</Button>
                          <Button sx={{fontSize:'10px'}} variant={'outlined'}> Contact</Button></>)
                        }
                      </TableCell>
                    </TableRow>
                  );
                })} 
              </TableBody>
            </Table>
            {appliedUsers.length === 0 && (<div style={{textAlign:"center",width:'98%',margin:'10px'}}><span>No applicants..</span></div>)}
          </TableContainer>
        </div>
      </div>
    </Container>
  );
};

export default AppliedUsers;
