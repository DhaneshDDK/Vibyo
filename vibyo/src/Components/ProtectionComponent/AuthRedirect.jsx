import { useNavigate } from 'react-router-dom'
import UIRoutes from '../../Routes/UIRoutes'
import { useSelector } from 'react-redux'
import React, {useEffect, useState} from 'react'
import Loader from '../Loader/Loader'

const AuthRedirect = ({children}) => {
    const navigate = useNavigate();
    const [canRender, setCanRender] = useState(false);
    const {token, user, isVerifying} = useSelector((state)=>state.user);

    useEffect(()=>{
      if (isVerifying) return;
      if(token && user?.verified){ 
        navigate(`${UIRoutes.Home.home}`);    
      } 
      else {
        setCanRender(true);
      }
    },[user,token,navigate,isVerifying])

    return isVerifying ? <Loader/> : (canRender ? <>{children}</> : <Loader/>);
} 

export default AuthRedirect
