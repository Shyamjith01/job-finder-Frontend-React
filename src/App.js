import './app.scss';
import {createBrowserRouter,json,Navigate,NavLink,RouterProvider} from "react-router-dom"
import Header from './Components/Header/Header';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import { gapi } from "gapi-script";
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setUser } from './Store/UserSlice';
import Employer from './Pages/Employer/Employer';
import SavedJobs from './Pages/SavedJobs/SavedJobs';
import AppliedUsers from './Pages/Applied-users/AppliedUsers';

function App() {

  const dispatch = useDispatch();  
  useEffect(() => { 
    if(Boolean(localStorage.getItem("token"))){
      dispatch(
        setUser({ user:JSON.parse(localStorage.getItem("currentUser")),
        token:JSON.parse(localStorage.getItem("token"))
      })
      )
    }
  }, []);

  const parseJWT = (token)=>{
    try {
      return JSON.parse(atob(token.split(".")[1])); 
    } catch (error) {
      return null;
    }
  }
  
  const isAuthenticated = Boolean(useSelector((state)=> state.user.token)) || Boolean(localStorage.getItem("token"));

  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId:
        "46861278582-sikf33bad8v4e1thu80o7vg104tqtc5l.apps.googleusercontent.com",
      plugin_name: "chat",
    });
  });

  const router = createBrowserRouter([
    {
      path:"/",
      element: <Header /> ,
      children:[
        {
          path:'/',
          element:isAuthenticated ? <Home /> : <Navigate to={'/login'} />
        },
        {
          path:'/employer',
          element:isAuthenticated ? <Employer /> : <Navigate to={'/login'} />
        },
        {
          path:"/saved-jobs",
          element: isAuthenticated ? <SavedJobs /> : <Navigate to={'/login'} />
        }, 
        {
          path:"/applied-users/:id",
          element: isAuthenticated ? <AppliedUsers /> : <Navigate to={'/login'} />
        }
      ]
    },{
      path:'/login',
      element:!isAuthenticated ? <Login /> : <Navigate to={'/'} />
    }
  ])
  return (
    <div className="App">
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
