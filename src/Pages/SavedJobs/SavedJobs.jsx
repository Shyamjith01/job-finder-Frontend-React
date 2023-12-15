import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import "./SavedJobs.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const SavedJobs = () => {
  const [alignment, setAlignment] = React.useState("Saved");
  const [savedJobs, setsavedJobs] = useState([]);
  const [appliedJobs, setappliedJobs] = useState([]);

  const token =
    useSelector((state) => state.user.token) ||
    JSON.parse(localStorage.getItem("token"));

  const handleChange = (e) => {
    setAlignment(e.target.value);
  };

  useEffect(() => {
    getSavedJobs();
    getAppliedJobs();
  }, []);

  //GET SAVED JOBS
  const getSavedJobs = () => {
    axios
      .get(`${process.env.REACT_APP_APIURL}/jobs/save`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response, "response from savedJObs");
        setsavedJobs(response.data);
      })
      .catch((Err) => {
        console.log(Err, "<=error");
      });
  };

  //GET APPLIED JOBS
  const getAppliedJobs = () => {
    axios
      .get(`${process.env.REACT_APP_APIURL}/jobs/apply`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        setappliedJobs(resp.data); 
      })
      .catch((err) => {
        console.log("catch error", err);
      });
  };

  const changeDateFormat = (jobDate) => { 
    const m = new Date(jobDate);
    const month = m.toLocaleString("default", { month: "short" });
    const day = m.getDate();
    const date = `${month} ${day}`; 
    return date;
  };

  const handleRemoveSavedItem = (job) => { 
    axios
      .delete(`${process.env.REACT_APP_APIURL}/jobs/save/${job.jobId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        const jobs = savedJobs.filter((item) => item._id != job._id);
        setsavedJobs(jobs);

        console.log(resp, "repsonse from deletion");
        toast.success("Removed from saved jobs");
      });
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: "start", marginTop: "1rem" }}>
      <h1>My Jobs</h1>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        sx={{ width: "100%" }}
      >
        <ToggleButton
          style={{ width: "-webkit-fill-available" }}
          fullWidth
          value="Saved"
        >
          Saved
        </ToggleButton>
        <ToggleButton
          style={{ width: "-webkit-fill-available" }}
          fullWidth
          value="Applied"
        >
          Applied
        </ToggleButton>
      </ToggleButtonGroup>
      <Grid>
        {savedJobs.length != 0 &&
          alignment == "Saved" &&
          savedJobs.map((item, i) => {
            return (
              <Grid item md={12} key={i}>
                <div
                  className="jobss"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 0px",
                    marginTop: "1rem",
                    borderBottom: "1px solid #E4E2E0",
                    paddingBottom: "1.3rem",
                  }}
                >
                  <div
                    className="left"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <h3 className="jobTitle" style={{ margin: "0" }}>
                      {item.job.jobTitle}
                    </h3>
                    <span style={{ padding: "5px 0" }} className="Companyname">
                      {item.job.companyName}
                    </span>
                    <span style={{ padding: "5px 0" }}>
                      {item.job.location}
                    </span>
                    <span
                      style={{
                        padding: "5px 0",
                        fontSize: "11px",
                        color: "#7C7C7C",
                      }}
                    >
                      Saved on {changeDateFormat(item.savedDate)}
                    </span>
                  </div>
                  <div
                    className="right"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Button
                      sx={{ width: "9rem", marginRight: "14px" }}
                      variant="contained"
                    >
                      Apply Now
                    </Button>
                    <div onClick={() => handleRemoveSavedItem(item)}>
                      <BookmarkIcon
                        style={{ fontSize: "2rem", cursor: "pointer" }}
                      />
                    </div>
                  </div>
                </div>
              </Grid>
            );
          })}
        {appliedJobs.length != 0 &&
          alignment == "Applied" &&
          appliedJobs.map((item, i) => {
            return (
              <Grid item md={12} key={i}>
                <div
                  className="jobss"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 0px",
                    marginTop: "1rem",
                    borderBottom: "1px solid #E4E2E0",
                    paddingBottom: "1.3rem",
                  }}
                >
                  <div
                    className="left"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <h3 className="jobTitle" style={{ margin: "0" }}>
                      {item.job.jobTitle}
                    </h3>
                    <span style={{ padding: "5px 0" }} className="Companyname">
                      {item.job.companyName}
                    </span>
                    <span style={{ padding: "5px 0" }}>
                      {item.job.location}
                    </span>
                    <span
                      style={{
                        padding: "5px 0",
                        fontSize: "11px",
                        color: "#7C7C7C",
                      }}
                    >
                      Applied on {changeDateFormat(item.appliedDate)}
                    </span>
                  </div>
                  <div
                    className="right"
                    style={{ display: "flex", alignItems: "center" }}
                  > 
                    <div className="status" style={item.status === "rejected" ? {padding:'10px',fontSize:'13px',width:'5rem',borderRadius:'10px',color:'white',textAlign:'center',backgroundColor:'#D32F2F'} : {padding:'10px',fontSize:'13px',width:'5rem',borderRadius:'10px',color:'#2781D7',textAlign:'center',backgroundColor:'#EDF4FB',border:'1px solid rgb(39, 129, 215)'}} >{item.status}</div> 
                  </div>
                </div>
              </Grid>
            );
          })}
        {savedJobs.length == 0 && (
          <div style={{ marginTop: "2rem", textAlign: "center"}}>
            No data found...
          </div>
        )}
        {
          appliedJobs.length == 0 && alignment == "Applied" && (
            <div style={{ marginTop: "2rem", textAlign: "center"}}>
              You haven't applied any jobs...
            </div>
          )
         }
      </Grid>
    </Container>
  );
};

export default SavedJobs;
