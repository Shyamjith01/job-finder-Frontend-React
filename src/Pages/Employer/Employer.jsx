import {
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import "./Employer.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import RichTextEditor from "../../Components/RichTextEditor";
import { SelectChangeEvent } from "@mui/material/Select";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import EmployerJobList from "../Employer-joblist/EmployerJobList";

const Employer = () => {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const navigate = useNavigate();
  const [isCreateJob, setisCreateJob] = useState(false);

  const token = useSelector((state) => state.user.token);

  //states
  const [jobType] = useState();
  const [schedule] = useState();
  const [supplementalPayvalue, setSupplementalPayValue] = useState([]);
  const [benafit, setBenafits] = useState([]);
  const [companyType, setcompanyType] = useState();

  const [salary, setsalary] = useState({
    min: 0,
    max: 0,
  });

  const handlebenafits = (event) => {
    const {
      target: { value },
    } = event;

    setBenafits(typeof value === "string" ? value.split(",") : value);
  };

  const [jobDescription, setjobDescription] = useState();

  const handleTextEditor = (event) => {
    setjobDescription(event);
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const jobTypes = [
    "Full time",
    "Permenent",
    "Freshers",
    "Part-time",
    "Temporary",
    "Internship",
    "Freelancer",
    "volanteer",
  ];

  const scheduleList = [
    "Day shift",
    "Morning shift",
    "Rotational shift",
    "Night shift",
    "Monday to friday",
    "Evening shift",
    "Weekend availability",
    "Fixed shift",
    "US shift",
    "Weekend only",
    "Others",
  ];

  const supplementalPay = [
    "Perfomance bonus",
    "Yearly bonus",
    "Commission pay",
    "Overtime pay",
    "Quarterly pay",
    "Shift allowance",
    "Joining bonus",
    "Others",
  ];

  const benafits = [
    "Health insurance",
    "Provident fund",
    "Cell phone reimbursement",
    "Paid sick time",
    "Work from Home",
    "Paid time off",
    "Food provided",
    "life insurance",
    "Internet reimbursement",
    "Commuter assistance",
    "Leave enhancement",
    "Flexible schedule, Other",
  ];

  const companyTypes = [
    "Corporate",
    "Foriegn MNC",
    "Startup",
    "Indian MNC",
    "Others",
    "MNC",
  ];

  const handleJobSubmission = (event) => { 
    const job = {
      ...event,
      benafits: benafit,
      supplementalPay: supplementalPayvalue,
      description: jobDescription,
    };

    axios
      .post(`${process.env.REACT_APP_APIURL}/jobs/create`, job, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => { 
        navigate("/");
      })
      .catch((err) => {
        console.log(err, "Erro");
      });
  };

  const handleSupplementalPays = (event) => {
    const {
      target: { value },
    } = event;

    setSupplementalPayValue(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangePage=()=>{

  }

  return (
    <div style={{textAlign:"start"}}>
      <Container maxWidth="md">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'1rem'}}>
          <h1 style={{ letterSpacing: "1px" ,marginBottom:'3rem'}}>{isCreateJob ? "Create a Job post":"Your jobs"}</h1>
          <Button variant="contained" onClick={()=>{setisCreateJob(!isCreateJob)}}>
            {isCreateJob ?  "View created jobs" : "Create a job post"}
          </Button>
        </div>
        {isCreateJob ? (
          <form action="" onSubmit={handleSubmit(handleJobSubmission)}>
            <Grid container rowGap={2}>
              <Grid container>
                <Grid width={"100%"} item md={12} lg={12}>
                  <TextField
                    InputLabelProps={{ style: { fontWeight: 600 } }}
                    size="small"
                    id="outlined-basic"
                    fullWidth
                    label="Company name"
                    variant="outlined"
                    {...register("companyName")}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid width={"100%"} item md={6} lg={6}>
                  <TextField
                    InputLabelProps={{ style: { fontWeight: 600 } }}
                    size="small"
                    id="outlined-basic"
                    fullWidth
                    label="Full name"
                    variant="outlined"
                    {...register("fullName")}
                  />
                </Grid>
                <Grid width={"100%"} item md={6} lg={6}>
                  <TextField
                    InputLabelProps={{ style: { fontWeight: 600 } }}
                    size="small"
                    id="outlined-basic"
                    fullWidth
                    label="Phone number"
                    variant="outlined"
                    {...register("phoneNumber")}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid width={"100%"} item md={6} lg={6}>
                  <TextField
                    InputLabelProps={{ style: { fontWeight: 600 } }}
                    size="small"
                    id="outlined-basic"
                    fullWidth
                    label="Email"
                    variant="outlined"
                    {...register("email")}
                  />
                </Grid>
                <Grid width={"100%"} item md={6} lg={6}>
                  <TextField
                    InputLabelProps={{ style: { fontWeight: 600 } }}
                    size="small"
                    id="outlined-basic"
                    fullWidth
                    label="Number of employee"
                    variant="outlined"
                    {...register("numberOfEmployees")}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ marginTop: "10px" }}>
                <Grid width={"100%"} item md={6} lg={6}>
                  <TextField
                    InputLabelProps={{ style: { fontWeight: 600 } }}
                    size="small"
                    id="outlined-basic"
                    fullWidth
                    label="Job title"
                    variant="outlined"
                    {...register("jobTitle")}
                  />
                </Grid>
                <Grid width={"100%"} item md={6} lg={6}>
                  <TextField
                    InputLabelProps={{ style: { fontWeight: 600 } }}
                    size="small"
                    id="outlined-basic"
                    fullWidth
                    label="Location"
                    variant="outlined"
                    {...register("location")}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid width={"100%"} item md={6} lg={6}>
                  {/* <TextField
                  InputLabelProps={{ style: { fontWeight: 600 } }}
                  size="small"
                  id="outlined-basic"
                  fullWidth
                  label="Job type"
                  variant="outlined"
                  {...register("jobType")}
                /> */}
                  <FormControl sx={{ width: "100%" }} size="small">
                    <InputLabel id="demo-simple-select-helper-label">
                      Job type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={jobType}
                      label="Job type"
                      // onChange={handleChange}
                      {...register("jobType")}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {jobTypes.map((item) => (
                        <MenuItem value={item}>{item}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid width={"100%"} item md={6} lg={6}>
                  <TextField
                    InputLabelProps={{ style: { fontWeight: 600 } }}
                    size="small"
                    id="outlined-basic"
                    fullWidth
                    label="Number of opertunity"
                    variant="outlined"
                    type="number"
                    {...register("numberOfOpertunity")}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid width={"100%"} item md={6} lg={6}>
                  <FormControl sx={{ width: "100%" }} size="small">
                    <InputLabel id="demo-simple-select-helper-label">
                      Schedule
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={schedule}
                      label="Schedule"
                      {...register("schedule")}
                      // onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {scheduleList.map((item) => (
                        <MenuItem value={item}>{item}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid width={"100%"} item md={6} lg={6}>
                  <FormControl sx={{ width: "100%" }} size="small">
                    <InputLabel id="demo-simple-select-helper-label">
                      Company type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={companyType}
                      label="Company type"
                      {...register("company type")}
                      // onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {companyTypes.map((item) => (
                        <MenuItem value={item}>{item}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ marginTop: "10px" }}>
                <Grid width={"100%"} item md={6} lg={6}>
                  <TextField
                    InputLabelProps={{ style: { fontWeight: 600 } }}
                    size="small"
                    id="outlined-basic"
                    fullWidth
                    label="Minimum year of experience"
                    variant="outlined"
                    {...register("minExp")}
                  />
                </Grid>
                <Grid width={"100%"} item md={6} lg={6}>
                  <TextField
                    InputLabelProps={{ style: { fontWeight: 600 } }}
                    size="small"
                    id="outlined-basic"
                    fullWidth
                    type="number"
                    label="Maximum year of experience"
                    variant="outlined"
                    {...register("maxExp")}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid width={"100%"} item md={6} lg={6}>
                  <TextField
                    InputLabelProps={{ style: { fontWeight: 600 } }}
                    size="small"
                    id="outlined-basic"
                    fullWidth
                    label="Minimum pay"
                    variant="outlined"
                    {...register("minPay")}
                  />
                </Grid>
                <Grid width={"100%"} item md={6} lg={6}>
                  <TextField
                    InputLabelProps={{ style: { fontWeight: 600 } }}
                    size="small"
                    id="outlined-basic"
                    fullWidth
                    type="number"
                    label="Maximum pay"
                    variant="outlined"
                    {...register("maxPay")}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid width={"100%"} item md={6} lg={6}>
                  <FormControl sx={{ width: "100%" }} size="small">
                    <InputLabel id="demo-multiple-chip-label">
                      Supplemental pay
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      placeholder="Supplemental pay"
                      multiple
                      value={supplementalPayvalue}
                      onChange={handleSupplementalPays}
                      input={
                        <OutlinedInput
                          id="select-multiple-chip"
                          label="Supplemental pay"
                        />
                      }
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                    >
                      {supplementalPay.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid width={"100%"} item md={6} lg={6}>
                  <FormControl sx={{ width: "100%" }} size="small">
                    <InputLabel id="demo-multiple-chip-label">
                      Benafits
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      placeholder="Benafits"
                      multiple
                      value={benafit}
                      onChange={handlebenafits}
                      input={
                        <OutlinedInput
                          id="select-multiple-chip"
                          label="Benafits"
                        />
                      }
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                    >
                      {benafits.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginBottom: "10px" }}>
                <Grid width={"100%"} item md={12} lg={12}>
                  <div
                    style={{
                      textAlign: "start",
                      paddingBottom: "6px",
                      color: "#ACADAE",
                      marginLeft: "4px",
                      marginBottom: "5px",
                    }}
                  >
                    <span>Job description</span>
                  </div>
                  <RichTextEditor passDescriptionText={handleTextEditor} />
                </Grid>
              </Grid>
            </Grid>
            <div className="submit-button" style={{ marginBottom: "8rem",textAlign:'center' }}>
              <Button type="submit" variant="contained">
                Create
              </Button>
            </div>
          </form>
        ) : (
          <EmployerJobList />
        )}
      </Container>
    </div>
  );
};

export default Employer;
