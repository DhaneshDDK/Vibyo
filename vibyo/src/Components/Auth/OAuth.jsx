import React, { useEffect } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Redux/UserSlice';

const OAuth = () => {
  const user = useSelector(state => state.user?.user);
  const dispatch = useDispatch();
  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token && !user){
      const userObject = jwtDecode(token);
      dispatch(setUser({user: userObject, token}));
    }
  },[]);

  const responseMessage = (response) => {
    const userObject = jwtDecode(response.credential);
    dispatch(setUser({user: userObject, token: response.credential}));
};
const errorMessage = (error) => {
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
