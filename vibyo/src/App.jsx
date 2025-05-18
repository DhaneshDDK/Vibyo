import React from "react"
import Auth from "./Components/Auth/Auth"
import OTP from "./Components/Auth/OTP"
import UIRoutes from './Routes/UIRoutes'
import {Routes, Route} from 'react-router-dom'
import ProtectedRoute from "./Components/ProtectionComponent/ProtectedRoute"
import AuthRedirect from "./Components/ProtectionComponent/AuthRedirect.jsx"
import { Outlet, Navigate } from 'react-router-dom';
import Home from './Components/Home/Home.jsx'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector} from "react-redux"
import { GetMethod } from "./ApiService/Auth.js"
import ServerRoutes from './Routes/Constants.js'
import { setUser, logoutUser} from "./Redux/UserSlice.jsx"
import { userNotVerified } from "./Constants.js"
import Loader from "./Components/Loader/Loader.jsx"

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user,token, isVerifying} = useSelector((state)=>state.user);
  const [isAppReady, setIsAppReady] = useState(false);

 useEffect(() => {
  const verifyUser = async () => {
    dispatch(setUser({ isVerifying: true })); 
    try {
      const response = await GetMethod(ServerRoutes.Auth.verifyToken);
      const responseData = await response.json();
      if (response.status === 200) {
        dispatch(setUser({ user: responseData.user, token : token, isVerifying: false}));
        if (!responseData.user.verified) {
          navigate(UIRoutes.Auth.otp);
        }
      } else {
        if (responseData.message === userNotVerified) {
          dispatch(setUser({ user: responseData.user, token : token, isVerifying: false }));
          navigate(UIRoutes.Auth.otp);
        } else {
          dispatch(logoutUser());
          navigate(UIRoutes.Auth.auth);
        }
      }
    } catch (error) {
      dispatch(logoutUser());
      navigate(UIRoutes.Auth.auth);
    } finally{
      setIsAppReady(true)
    }
  };

  if(token && !user) verifyUser();
  else setIsAppReady(true);
}, [user, token, dispatch, navigate]);

if (!isAppReady) return <Loader />;

  return (  
    <>
      <Routes>
          <Route path={UIRoutes.Auth.auth} element={<AuthRedirect><Auth/></AuthRedirect>}/>
          <Route path={UIRoutes.Auth.otp} element={<AuthRedirect><OTP/></AuthRedirect>}/>
         <Route path={UIRoutes.Home.home} element = {
            <ProtectedRoute><Home/></ProtectedRoute>
         }/>
         <Route path='*' element={<Loader/>} />
      </Routes>
    </>
  )
}

export default App
