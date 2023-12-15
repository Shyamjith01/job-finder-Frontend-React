import React, { useEffect, useState } from "react";
import "./jobcard.scss";
import { Badge, Card } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"; 
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const Jobcard = ({handleSelectjob,item}) => { 

  const token = useSelector((state) => state.user.token);
  const currentUser = useSelector((state=>state.user.user)); 
  const [isSaved, setisSaved] = useState();
  const formatIndianPrice = (number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(number);
  };

  useEffect(() => { 
    setisSaved(item.isSaved.includes(currentUser._id));
  }, [])
  

  const handleSaveJobs=(status)=>{ 
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if(status){
      setisSaved(false);
      axios.delete(`${process.env.REACT_APP_APIURL}/jobs/save/${item._id}`,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      }).then((resp)=>{
        toast.success('Removed from saved jobs');
      })

    }else{
      setisSaved(true);
      const job = {
        jobId:item._id,
        userId:user._id,
        savedDate:new Date(),
      }
       
      axios.post(
        `${process.env.REACT_APP_APIURL}/jobs/save`,job,{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res)=>{
        console.log(res.statusText,"resoooo");
        if(res.statusText == "Created"){
          toast.success("Added to saved jobs..");
        }
      })
    }
  }

  const handleSelect=()=>{
    handleSelectjob(item);
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
        marginBottom:'1rem'
      }}
    >
      <div style={{ padding: "11px" }}>
        <small>new</small>
        <h3 className="jobTitle" onClick={()=>handleSelect()} style={{ margin: "0" }}>{item.jobTitle}  <span>({item.minExperience} - {item.maxExperience} Yrs)</span></h3>
        <span className="companyandlocation">{item.companyName}</span>{" "}
        <br />
        <span className="companyandlocation">{item.location}</span> <br />
        <span style={{fontWeight:'bold',fontSize:'12px'}}>{item.jobType}</span>
        <div style={{ display: "flex" }}>
          <div className="badge">
            {formatIndianPrice(item.minPay)} - {formatIndianPrice(item.maxPay)} a month
          </div>
          <div className="badge">{item.jobType}</div>
          <div className="badge">Monday to Friday</div>
        </div>
        <div
          className="bottum"
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            fontWeight: "bold",
            fontSize: "12px",
            marginTop: "9px",
          }}
        >
          <span style={{ marginLeft: "3px" }}>Just now</span>
          <div
            className="save"
            onClick={()=>handleSaveJobs(isSaved)}
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "1rem",
            }}
          >
            {isSaved ? <BookmarkIcon />  : <BookmarkBorderIcon /> }
            <span>save</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Jobcard;
