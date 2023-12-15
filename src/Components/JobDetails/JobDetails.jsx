import { Button, Card, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Editor, EditorState, convertFromRaw } from "draft-js";
import "./JobDetails.scss";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import JobApply from "../Job-apply-window/JobApply";

const JobDetails = ({job,handleBackward}) => { 
  const [editorState, seteditorState] = useState();
  const [isApplying, setisApplying] = useState(false)
  const handleBackWard=()=>{ 
    handleBackward();
  };
 
  useEffect(() => { 
    const contentState = convertFromRaw(JSON.parse(job.description));
    seteditorState(EditorState.createWithContent(contentState)); 
  }, []);
  
 
  const formatIndianPrice = (number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(number);
  };
 

  const handleCloseApplyModal=()=>{
    setisApplying(false);
  }


  return (
    <Card
      sx={{
        textAlign: "start",
        marginTop: "1rem",
        boxShadow:
          "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em",
        borderRadius: "9px",
        cursor: "pointer",
        marginBottom: "1rem",
        marginTop:'1rem',
        padding:'20px'
      }}
    >
      <div ><ArrowBackIcon onClick={handleBackWard} /></div> 
      <h3 style={{ margin: "0" }}>{job.jobTitle} <span>({job.minExperience} - {job.maxExperience} Yrs)</span></h3>
        <span className="companyandlocation" style={{marginTop:'5px'}}>{job.companyName}</span>{" "}
        <br />
        <span className="companyandlocation" style={{marginTop:'5px'}}>{job.location}</span> <br />
        <span style={{fontWeight:'bold',fontSize:'12px',marginTop:'5px'}}>{job.jobType}</span>
        <div style={{ display: "flex" }}>
          <div className="badge">
            {formatIndianPrice(job.minPay)} - {formatIndianPrice(job.maxPay)} a month
          </div>
          <div className="badge">{job.jobType}</div>
          <div className="badge">Monday to Friday</div>
        </div>
        <div style={{marginTop:'1rem'}}>
          <Button sx={{width:'9rem',marginRight:'14px'}} variant="contained" onClick={()=>{setisApplying(true)}}>Apply</Button>
          <Button style={{background:'#E4E2E0',color:'black'}} variant="contained"><FavoriteBorderIcon /></Button>
        </div>
        <div className="details">
            <h3 style={{letterSpacing:'1px'}}>Job details</h3>
            {editorState && (<Editor editorState={editorState} readOnly />)}
        </div> 
        {
          isApplying ? <JobApply job={job} handleClose={handleCloseApplyModal} /> : <></>
        }
    </Card>
  );
};

export default JobDetails;
