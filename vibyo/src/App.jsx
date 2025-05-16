import React from "react"
import Auth from "./Components/Auth/Auth"
import OTP from "./Components/Auth/OTP"
import UIRoutes from './Routes/UIRoutes'
import {Routes, Route} from 'react-router-dom'
import ProtectedRoute from "./Components/ProtectionComponent/ProtectedRoute"
import AuthRedirect from "./Components/ProtectionComponent/AuthRedirect.jsx"
import { Outlet, Navigate } from 'react-router-dom';
import Home from './Components/Home/Home.jsx'
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector} from "react-redux"
import { GetMethod } from "./ApiService/Auth.js"
import ServerRoutes from './Routes/Constants.js'
import { setUser, logoutUser} from "./Redux/UserSlice.jsx"
import { userNotVerified } from "./Constants.js"

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user,token} = useSelector((state)=>state.user);

  useEffect(()=>{
     const verifyUser = async()=>{
       try {
        const response = await GetMethod(ServerRoutes.Auth.verifyToken);
        const responseData = await response.json();
        if(response.status === 200){
           dispatch(setUser({user:responseData?.user, token:token}));
           if(!responseData?.user?.verified){
             navigate(`${UIRoutes.Auth.auth}/${UIRoutes.Auth.otp}`);
             return;
           }
        }else{
          if(responseData.message === userNotVerified){
              dispatch(setUser({user:responseData?.user, token:token}));
              toast.error(responseData.message)
              navigate(`${UIRoutes.Auth.auth}/${UIRoutes.Auth.otp}`)
          }else {
            dispatch(logoutUser());
            navigate(`${UIRoutes.Auth.auth}/${UIRoutes.Auth.credential}`);
          }
          return;
        }
        } catch (error) {
            navigate(`${UIRoutes.Auth.auth}/${UIRoutes.Auth.credential}`);
        } finally{
        }
     }
     if (!token) {
        dispatch(setUser({ user: null, token: null, isVerifying: false }));
        navigate(`${UIRoutes.Auth.auth}/${UIRoutes.Auth.credential}`);
        return;
     }
     else if(!user) verifyUser();
  },[user,token,dispatch,navigate])


  return (  
    <>
      <Routes>
         <Route path={UIRoutes.Auth.auth} element={
            <AuthRedirect>
              <div><Outlet/></div>
            </AuthRedirect>
          }>
             <Route index element={<Navigate to={UIRoutes.Auth.credential} replace />} />
             <Route path={UIRoutes.Auth.credential} element={<Auth auth={true}/>}/>
             <Route path={UIRoutes.Auth.otp} element={<OTP/>}/>
         </Route>
         <Route path={UIRoutes.Home.home} element = {
            <ProtectedRoute><Home/></ProtectedRoute>
         }/>
      </Routes>
    </>
  )
}

export default App
