import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import UIRoutes from '../../Routes/UIRoutes'
import Loader from '../Loader/Loader'

const ProtectedRoute = ({children}) => {
  const {user, isVerifying} = useSelector((state)=>state.user);
  const navigate = useNavigate();
  const [canRender, setCanRender] = useState(false);
  useEffect(()=>{
     if (isVerifying) return;
     if(!user) navigate(`${UIRoutes.Auth.auth}/${UIRoutes.Auth.credential}`);
     else if(user && !user?.verified) navigate(`${UIRoutes.Auth.auth}/${UIRoutes.Auth.otp}`);
     else setCanRender(true);
  },[user,navigate,isVerifying]);
  
  return isVerifying ? <Loader/> : (canRender ? <>{children}</> : <Loader/>);

}

export default ProtectedRoute
