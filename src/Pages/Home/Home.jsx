import axios from 'axios'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Jobs from '../../Components/Jobs/Jobs';

const Home = () => {

  const token = useSelector((state)=> state.user.token) || JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_APIURL}/jobs`,{
      headers:{
        'Content-Type':'application/json',
        "Authorization":`Bearer ${token}`
      }
    }).then((res)=>{
      console.log(res,"Response from get API");
    }).catch((err)=>{
      console.log("Errorfrom job getting...");
    })
  }, [])
  
  return (
    <div>
      <Jobs />
    </div>
  )
}

export default Home