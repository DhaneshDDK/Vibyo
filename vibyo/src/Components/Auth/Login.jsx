import React, { useEffect } from 'react'
import { MdEmail } from "react-icons/md";
import { IoEye, IoEyeOff  } from "react-icons/io5";
import { useState } from 'react'
import OAuth from './OAuth';
import { toast } from 'react-toastify';
import PasswordStrength from './PasswordStrength'
import { PostMethod } from '../../ApiService/Auth';
import ServerRoutes from '../../Routes/Constants'
import {userNotVerified} from '../../Constants'
import { useNavigate } from 'react-router-dom';
import UIRoutes from '../../Routes/UIRoutes';
import { useDispatch } from 'react-redux';
import { setUser, logoutUser } from '../../Redux/UserSlice';

const Login = ({isLeft,setIsLeft,mobileToggle}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const validatePassword = (password)=>{
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      return passwordRegex.test(password);
    }

    const validateEmail = (email)=>{
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    const handleLoginForm = async (e)=>{
      e.preventDefault();
      setLoading(true);
      if(!email || !password){
        toast.warn("All fields are required");
        return;
      }

      if(!validateEmail(email)){
        toast.warn("Invalid email format"); 
        return;
      }

      if(!validatePassword(password)){
        toast.warn("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.");
        return;
      }
      
      const loginData = {
        email,
        password
      }
      
      try {
         const response = await PostMethod(ServerRoutes.Auth.Login, loginData);
         const responseData = await response.json();
         if(response.status==200) {
          toast.success(responseData.message);
          dispatch(setUser({user:responseData?.user, token:responseData?.token}));
          navigate(UIRoutes.Home.home);
        }
         else {
          toast.error(responseData.message)
          if(responseData.message === userNotVerified) {
            navigate(`${UIRoutes.Auth.auth}/${UIRoutes.Auth.otp}`);
            dispatch(setUser({user:responseData?.user, token:responseData?.token}));
          }else{
            dispatch(logoutUser())
          }
        }
      } catch (error) {
          console.error("Error during login:", error);
          toast.error("Login failed. Please try again.");
      }
      setLoading(false);
    }

  return (
    <form className='flex flex-col items-between justify-center gap-6 w-full h-full bg-white rounded-md p-6' 
    onSubmit={handleLoginForm}>
         <div className='text-red-400 font-bold text-3xl'>LOG IN</div>
         <div>
            <div className='flex items-center justify-between gap-2 w-full'>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email*' required className='outline-none px-4 py-2 w-full box-border'/>
                <MdEmail color='gray'/>
            </div>
            <div className='h-[1px] w-full bg-gray-400'></div>
         </div>
         <div>
            <div className='flex items-center justify-between gap-2 w-full'>
               <input type={showPassword?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)} required placeholder='Password*' className='outline-none box-border px-4 py-2 w-full'/>
               {
                !showPassword ? <IoEye color='gray' onClick={handleShowPassword} className='cursor-pointer'/> : <IoEyeOff  onClick={handleShowPassword} className='cursor-pointer' color='gray' />
               }
            </div>
            <div className="w-full h-2">
            {password? <PasswordStrength password={password} /> : <div className='h-[1px] w-full bg-gray-400'></div>}
            </div>
         </div>
         <div className='flex items-center justify-end gap-5 w-full'>
         <div className='text-[16px] font-serif text-gray-400 cursor-pointer underline'>Forgot password?</div>
         <div className={`text-[16px] font-serif text-gray-400 cursor-pointer underline ${mobileToggle?"block":"hidden"}`} onClick={()=>setIsLeft(!isLeft)}>Signup</div>
         <button className='bg-red-400 text-white rounded-md px-6 py-2' disabled={loading}>LOG IN</button>
         </div>
        <OAuth/>
    </form>
  )
}

export default Login
