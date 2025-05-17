import React, { useEffect } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Redux/UserSlice';
import { toast } from 'react-toastify';
import { PostMethod } from '../../ApiService/Auth';
import ServerRoutes from '../../Routes/Constants'
import { useNavigate } from 'react-router-dom';
import UIRoutes from '../../Routes/UIRoutes'

const OAuth = () => {
  const user = useSelector(state => state.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const responseMessage = async (response) => {
    try {
      const res = await PostMethod(ServerRoutes.Auth.googleOAuth,{credential:response.credential});
      const responseData = await res.json();
      if(res.status===200) {
            toast.success("Loggedin successfully");
            dispatch(setUser({user:responseData?.user, token:responseData?.token}));
            navigate(`${UIRoutes.Home.home}`);
         }
         else toast.error(responseData.message);
    } catch (error) {
      console.log(error);
      toast.error("Login Failed") 
    }
};
const errorMessage = (error) => {
    toast.error("Login Failed")
    console.log("Error occurred: ", error);
};

  return (
    <>
    <div className='text-gray-400 text-center'>or you can sign in with</div>
    <div className='flex items-center justify-center gap-4 w-full'>
    <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
    </div>
    </>
  )
}

export default OAuth
