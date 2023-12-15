import { Box, Checkbox, FormControl, FormControlLabel, Slider } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./jobfilters.scss";

const JobFilters = ({handleJobFilter}) => { 

  const [jobType, setjobType] = useState("")
  const [experience, setexperience] = useState();


  const jobTypes = [
    {label:"Full time", value:'fulltime'},
    {label:"Freshers", value:'freshers'},
    {label:"Internship", value:'internship'},
    {label:"Permenent", value:'permenent'}
  ]



  useEffect(() => {
    fetchJobs();
  }, [jobType,experience]);

  const fetchJobs =()=>{ 
    handleJobFilter({jobType,experience})
  }
  

  const expText =(value)=>{
    return `${value}°C`
  }

  const handleJobTypeChange=(type)=>{ 
    setjobType(!type.target.checked ? '' : type.target.value);
  };
  
  return (
    <>
      <div className="filter">
        All filters
        <hr />
        <div style={{ marginTop: "1rem" }}>
          <span>Work mode</span> <br />
          <div>
            <FormControl> 
              {
                jobTypes.map((item) => {
                  return(
                    <FormControlLabel key={item.value}
                    control={<Checkbox value={item.label} checked={jobType == item.label} onChange={(e)=>handleJobTypeChange(e)} color="default" />}
                    label={item.label} 
                  />
                  )
                })
              } 
            </FormControl>
          </div>
          <div style={{ marginTop: "1rem" }}>
            Experience
            <div>
              <Slider
                aria-label="Experience"
                defaultValue={0}
                getAriaValueText={expText}
                valueLabelDisplay="auto"
                step={1}
                onChange={(e)=>setexperience(e.target.value)}
                marks
                min={0} 
                max={20}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobFilters;
