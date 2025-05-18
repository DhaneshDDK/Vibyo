import { useNavigate } from 'react-router-dom'
import UIRoutes from '../../Routes/UIRoutes'
import { useSelector } from 'react-redux'
import React, {useEffect, useState} from 'react'
import Loader from '../Loader/Loader'
import { useLocation } from 'react-router-dom'

const AuthRedirect = ({children}) => {
    const navigate = useNavigate();
    const {token, user, isVerifying} = useSelector((state)=>state.user);
    const location = useLocation();
    const [canRender, setCanRender] = useState(false);

    useEffect(()=>{
      if (isVerifying) return;
      if(token && user?.verified){ 
        navigate(`${UIRoutes.Home.home}`);    
      } 
      else if(token && !user?.verified && location.pathname === UIRoutes.Auth.auth) {
        navigate(UIRoutes.Auth.otp);
      }
      else if (!token && location.pathname === UIRoutes.Auth.otp) {
       navigate(UIRoutes.Auth.auth);
      }else setCanRender(true)
    },[user,token,navigate,isVerifying, location.pathname])

    if(!canRender || isVerifying) return <Loader/>
    return <>{children}</>
s} 

export default AuthRedirect
