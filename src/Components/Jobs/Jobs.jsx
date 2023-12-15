import React, { useEffect, useState } from "react";
import Jobcard from "../JobCard/Jobcard";
import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import JobFilters from "../JobFilters/JobFilters";
import SearchIcon from "@mui/icons-material/Search";
import JobDetails from "../JobDetails/JobDetails";

const Jobs = () => {
  const [Jobs, setJobs] = useState([]);
  const [search, setsearch] = useState("");
  const [jobType, setjobType] = useState("")
  const [experience, setexperience] = useState();
  const [selectedJob, setselectedJob] = useState({});
  const [ErrorMessage, setErrorMessage] = useState("");
  const [isJobDetailPage, setisJobDetailPage] = useState(false);

  const token =
    useSelector((state) => state.user.token) ||
    JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    fetchJob();
  }, [jobType,search,experience]);

  const fetchJob = () => {
    axios
      .get(
        `${process.env.REACT_APP_APIURL}/jobs/filter?experience=${
          experience ? experience : ""
        }&jobtype=${jobType ? jobType : ""}&search=${search}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => { 
        setJobs(res.data.jobs);
        if(res.data.data.length == 0){
          setErrorMessage("No data found...")
        }else{
          setErrorMessage("")
        }
      })
      .catch((err) => {
        console.log(err, "Errorfrom job getting...2");
      });
  };

  const handleJobFilter = (event) => { 
    setjobType(event.jobType);
    setexperience(event.experience ? event.experience : 0); 
  };

  const handleSelectJob=(job)=>{ 
    setselectedJob(job);
    setisJobDetailPage(true);
  }

  const handleBackWard=()=>{
    setisJobDetailPage(false);
  }

  return (
    <Container maxWidth="lg" sx={{ marginTop: "2rem" }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "fit-content",
            position:'sticky',
            top:'4rem'
          }}
        >
          <JobFilters handleJobFilter={handleJobFilter} />
        </Grid>
        <Grid item md={8}>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: '99%',
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="search jobs"
              value={search} 
              onChange={(e)=>setsearch(e.target.value)}
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} onClick={(e)=>setsearch(e.target.value)} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <div>
            {!isJobDetailPage && Jobs.map((item) => (
              <span>
                <Jobcard handleSelectjob={handleSelectJob} item={item} />
              </span>
            ))}
          </div>
          {Jobs.length == 0 && (<div style={{marginTop:"1rem"}}>{ErrorMessage}</div>)}
          {isJobDetailPage && (<JobDetails job={selectedJob} handleBackward={handleBackWard} />)}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Jobs;
