import { Button, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router";

const EmployerJobList = () => {
  const token =
    useSelector((state) => state.user.token) ||
    JSON.parse(localStorage.getItem("token"));

  const [ownJobs, setownJobs] = useState([]);
  const navigate = useNavigate();

  const getOwnJobs = () => {
    axios
      .get(`${process.env.REACT_APP_APIURL}/jobs/filter?employer=true`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => { 
        if (res.data) {
          setownJobs(res.data.jobs);
        }
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const changeDateFormat = (jobDate) => { 
    const m = new Date(jobDate);
    const month = m.toLocaleString("default", { month: "short" });
    const day = m.getDate();
    const date = `${month} ${day}`; 
    return date;
  };

  useEffect(() => {
    getOwnJobs();
  }, []);

  return (
    <div>
      <Grid>
        {ownJobs.length != 0 && ownJobs.map((item, i) => {
            return (
              <Grid item md={12} key={i} style={{ textAlign: "start" }}>
                <div
                  className="jobss"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "20px 20px",
                    marginTop: "1rem",
                    border: "1px solid #E4E2E0",
                    borderRadius: "10px",
                  }}
                >
                  <div
                    className="left"
                    style={{ display: "flex", flexDirection: "column",cursor:'pointer' }} 
                    onClick={()=>navigate(`/applied-users/${item._id}`)}
                  >
                    <h3 className="jobTitle" style={{ margin: "0" }}>
                      {item.jobTitle}
                    </h3>
                    <span style={{ padding: "5px 0" }} className="Companyname">
                      {item.companyName}
                    </span>
                    <span style={{ padding: "5px 0" }}>{item.location}</span>
                    <span
                      style={{
                        padding: "5px 0",
                        fontSize: "11px",
                        color: "#7C7C7C",
                      }}
                    >
                      Posted on {changeDateFormat(item.createdAt)}
                    </span>
                  </div>
                  <div
                    className="right"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    Applied : {item.appliedCount}
                    <Button variant="outlined" sx={{marginTop:'1rem'}} color="error" startIcon={<DeleteIcon />}>
                      Delete
                    </Button>
                  </div>
                </div>
              </Grid>
            );
          })}

          {
            ownJobs.length == 0 && (
              <div style={{ marginTop: "2rem", textAlign: "center"}}>
                No data found ...
              </div>
            )
          }
      </Grid>
    </div>
  );
};

export default EmployerJobList;
