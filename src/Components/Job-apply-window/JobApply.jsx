import { Box, Button, Grid, Modal, TextField } from "@mui/material";
import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "@emotion/styled";
import { InboxOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { FileUploader } from "react-drag-drop-files";
import successImage from "../../assets/logo/success-filled-svgrepo-com (1).svg";

import { message, Upload } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

const { Dragger } = Upload;

const fileTypes = ["JPEG", "PNG", "GIF", "PDF"];

const props = {
  name: "file",
  multiple: false,
  onChange(info) { 
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const JobApply = ({ job, handleClose }) => {
  const [File, setFile] = useState("");
  const [prevCompany, setprevCompany] = useState("");
  const [totalExperience, settotalExperience] = useState();
  const [isApplied, setisApplied] = useState(false);

  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    pt: !isApplied ? 2 : 0,
    px: !isApplied ? 4 : 0,
    pb: !isApplied ? 3 : 0,
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleFileChange = (e) => { 
    setFile(e[0]);
  };

  const handleJobApply = (data) => {
    const formData = new FormData();
    formData.append("resume", File);
    formData.append("prevCompany", prevCompany);
    formData.append("prevExperience", totalExperience);
    formData.append("jobId", job._id);
    formData.append("userId", user._id);
    formData.append("appliedDate", new Date());

    axios
      .post(`${process.env.REACT_APP_APIURL}/jobs/apply`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => { 
        setisApplied(true);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  return (
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{ ...style, width: 500 }}>
        {!isApplied && (
          <>
            <h2 id="child-modal-title">Let's ready to apply the job</h2>
            <form action="" onSubmit={handleJobApply}>
              <Grid contianer rowGap={2}>
                <Grid container>
                  <Grid width={"100%"} item md={12}>
                    <TextField
                      InputLabelProps={{ style: { fontWeight: 600 } }}
                      size="small"
                      id="outlined-basic"
                      fullWidth
                      label="Previous company name"
                      variant="outlined"
                      placeholder="Previous company name"
                      onChange={(e) => setprevCompany(e.target.value)}
                    />
                  </Grid>
                  <Grid width={"100%"} item sx={{ marginTop: "1rem" }} md={12}>
                    <TextField
                      InputLabelProps={{ style: { fontWeight: 600 } }}
                      size="small"
                      id="outlined-basic"
                      fullWidth
                      type="number"
                      label="Years of experience"
                      variant="outlined"
                      placeholder="Years of experience"
                      onChange={(e) => settotalExperience(e.target.value)}
                    />
                  </Grid>
                  <Grid
                    width={"100%"}
                    item
                    sx={{ marginTop: "1rem", textAlign: "start" }}
                    md={12}
                  >
                    <label htmlFor="Resume">Upload resume</label>
                    <div style={{ marginTop: "1rem" }}>
                      <FileUploader
                        multiple={true}
                        handleChange={handleFileChange}
                        name="Resume"
                        types={fileTypes}
                      />
                    </div>
                    <div
                      style={{
                        textAlign: "start",
                        marginTop: "1rem",
                        fontSize: "12px",
                      }}
                    >
                      {File ? <span>{File.name}</span> : null}
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </form>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "2.2rem",
              }}
            >
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="outlined"
                type="submit"
                onClick={() => handleJobApply()}
              >
                Apply
              </Button>
            </div>
          </>
        )}
        {isApplied && 
        (<div style={{display:'flex',flexDirection:'column',paddingBottom:'2rem'}}>
          <div style={{width:'auto',backgroundColor:'#1976D2',color:'white',fontWeight:'500',padding:'10px'}} >
            <span>THANK YOU</span>
          </div>
          <img src={successImage} style={{width:'8rem',marginLeft:'auto',marginRight:'auto',marginTop:"1rem",marginBottom:'1rem'}} alt="" />
          <span style={{fontSize:'16px',padding:'0 30px'}}>Your submission has been received.Please check your email for confirmation</span>
          <Button variant="contained" sx={{with:'max-content',marginLeft:"auto",marginRight:'auto',marginTop:'1rem'}}  onClick={handleClose}>Close</Button>
        </div>)}
      </Box>
    </Modal>
  );
};

export default JobApply;
