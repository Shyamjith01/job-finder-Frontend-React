import React, { useEffect, useState } from "react";
import logo from "../../assets/logo/Indeed.png";
import "./login.scss";
import { GoogleLogin } from "react-google-login";
import { Button, Grid, TextField } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Store/UserSlice";

const clientId =
  "46861278582-sikf33bad8v4e1thu80o7vg104tqtc5l.apps.googleusercontent.com";

const Login = () => {
  const [isLogin, setisLogin] = useState(true);
  const [isLoginError, setisLoginError] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleTypeChange = () => {
    resetErrorMessage();
    reset();
    setisLogin(!isLogin);
  };


  //React Form

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm()

  const handleLogin = (data) => {
    setisLoginError(false);
    axios.post("http://localhost:8800/api/auth/login",data).then(async(res)=>{ 
      if(res.data.success == true){
        navigate("/");
        await localStorage.setItem("currentUser",JSON.stringify(res.data.user));
        await localStorage.setItem("token",JSON.stringify(res.data.token));

        await dispatch(
          setUser({
            user:res.data.user,
            token:res.data.token
          })
        )
      }else{
        setisLoginError(true);
        seterrorMessage(`Error: ${res.data.message}`);
      }
    }).catch((err)=>{
      console.log("login error",err);
    })
  };

  //Creating an account
  const handleSignUp = (data) =>{ 
    if(data.password != data.cpassword){
      setisLoginError(true);
      seterrorMessage("Password doesn't match");
    }else{
      resetErrorMessage(); 
      const user = {
        firstName:data.firstName,
        lastName:data.lastName,
        email:data.email,
        mobileNumber:data.mobileNumber,
        password:data.password
      }

      axios.post("http://localhost:8800/api/auth/register",user).then((data)=>{
        handleTypeChange();
        toast.success("Sign up completed..");
      }).catch((err)=>{
        console.log("Err:",err);
      })
    }
  }

  const resetErrorMessage = ()=>{
    setisLoginError(false);
    seterrorMessage("");
  }
 


  return (
    <div className="login">
      {/* <div className="logo">
        <img src={logo} alt="Logo" />
      </div> */}
      <div className="login-section">
        <div>
          {isLogin ? (
            <>
              <h3>Ready to take the step?</h3>
              <span>Create an account or sign in.</span>
              <p>
                By creating an account or signing in, you understand and agree
                to Indeed's <a>Terms</a>. You also acknowledge our{" "}
                <a href="">Cookie</a> and <a href="">Privacy</a> policies. You
                will receive marketing messages from Indeed and may opt out at
                any time by following the unsubscribe link in our messages, or
                as detailed in our terms.
              </p> 
              <div className="or">
                <hr />
                <span>or</span>
              </div>

              <form onSubmit={handleSubmit(handleLogin)} action="" style={{ textAlign: "center" }}>
                <Grid container rowSpacing={2}>
                  <Grid item xs={12} lg={12}>
                    <TextField
                      InputLabelProps={{ style: { fontWeight: 600 } }}
                      size="small"
                      id="outlined-basic"
                      fullWidth
                      label="Email address"
                      variant="outlined"
                      {...register("email")}
                    />
                  </Grid>
                  <Grid item xs={12} lg={12}>
                    <TextField
                      InputLabelProps={{ style: { fontWeight: 600 } }}
                      size="small"
                      id="outlined-basic"
                      fullWidth
                      type="password"
                      label="Password"
                      variant="outlined"
                      {...register("password")}
                    />
                  </Grid>
                </Grid>
                {isLoginError ? (
                  <div className="error-text">
                    <span>{errorMessage}</span>
                  </div>):null
                }
                <Button
                  fullWidth
                  style={{ marginTop: "1rem", marginBottom: "1rem" }}
                  variant="contained"
                  type="submit"
                >
                  Login
                </Button>
                <span style={{ cursor: "pointer" }} onClick={handleTypeChange}>
                  Create a new account?
                </span>
              </form>
            </>
          ) : (
            <div style={{textAlign:'center'}}>
              <h3 style={{ textAlign: "center" }}>Sign-up</h3>
              <form onSubmit={handleSubmit(handleSignUp)}>
                <Grid container rowSpacing={2}>
                  <Grid container spacing={2} mt={1}>
                    <Grid item xs={6} lg={6}>
                      <TextField
                        InputLabelProps={{ style: { fontWeight: 600 } }}
                        size="small"
                        id="outlined-basic"
                        fullWidth
                        label="First name"
                        variant="outlined"
                        {...register("firstName")}
                      />
                    </Grid>
                    <Grid item xs={6} lg={6}>
                      <TextField
                        InputLabelProps={{ style: { fontWeight: 600 } }}
                        size="small"
                        id="outlined-basic"
                        fullWidth
                        label="Last name"
                        variant="outlined"
                        {...register("lastName")}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} lg={12}>
                    <TextField
                      InputLabelProps={{ style: { fontWeight: 600 } }}
                      size="small"
                      id="outlined-basic"
                      fullWidth
                      label="Phone Number"
                      variant="outlined"
                      {...register("mobileNumber")}
                    />
                  </Grid>
                  <Grid item xs={12} lg={12}>
                    <TextField
                      InputLabelProps={{ style: { fontWeight: 600 } }}
                      size="small"
                      id="outlined-basic"
                      fullWidth
                      label="Email address"
                      variant="outlined"
                      {...register("email")}
                    />
                  </Grid>

                  <Grid item xs={12} lg={12}>
                    <TextField
                      InputLabelProps={{ style: { fontWeight: 600 } }}
                      size="small"
                      id="outlined-basic"
                      fullWidth
                      label="Password"
                      variant="outlined"
                      {...register("password")}
                    />
                  </Grid>
                  <Grid item xs={12} lg={12}>
                    <TextField
                      InputLabelProps={{ style: { fontWeight: 600 } }}
                      size="small"
                      id="outlined-basic"
                      fullWidth
                      label="Re-enter password"
                      variant="outlined"
                      {...register("cpassword")}
                    />
                  </Grid>
                </Grid>
                {isLoginError ? (
                  <div className="error-text">
                    <span>{errorMessage}</span>
                  </div>):null
                }
                <Button
                  fullWidth
                  style={{ marginTop: "1rem", marginBottom: "1rem" }}
                  variant="contained"
                  type="submit"
                >
                  Sing up
                </Button> 
              </form>
              <span style={{ cursor: "pointer" }} onClick={handleTypeChange}>
                  Already have an account?
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
