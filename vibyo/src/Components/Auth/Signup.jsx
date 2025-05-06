import React from 'react'
import { FaUserLarge } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoEye, IoEyeOff  } from "react-icons/io5";
import { useState } from 'react'
import OAuth from './OAuth';
import { toast } from 'react-toastify';
import PasswordStrength from './PasswordStrength';

const Signup = ({isLeft,setIsLeft,mobileToggle}) => {
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


   const handlePassword = ()=>{
      setShowPassword(!showPassword)
   }

   const handleConfirmPassword = ()=>{
      setShowConfirmPassword(!showConfirmPassword);
   }

   const validatePassword = (password, confirmPassword)=>{
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if(password !== confirmPassword){
            toast.warn("Passwords do not match");
            return false;
         }
         if(!passwordRegex.test(password)){
            toast.warn("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.");
            return false;
         }
         return true;
   }
   const handleSignupForm = (e)=>{
      e.preventDefault();
      if(!validatePassword(password, confirmPassword)){
         return;
      }
   }
  return (
   <form className='flex flex-col items-between justify-center gap-4 w-full h-full bg-white rounded-md p-6'
       onSubmit={handleSignupForm}>
            <div className='text-red-400 font-bold text-3xl'>SIGN UP</div>
            <div>
               <div className='flex items-center justify-between gap-2 w-full'>
                   <input type="text" placeholder='Full Name*' value={fullName} onChange={e=>setFullName(e.target.value)} required className='outline-none px-4 py-2 w-full box-border'/>
                   <FaUserLarge color='gray'/>
               </div>
               <div className='h-[1px] w-full bg-gray-400'></div>
            </div>
            <div>
               <div className='flex items-center justify-between gap-2 w-full'>
                   <input type="email" placeholder='Email*' value={email} onChange={e=>setEmail(e.target.value)} required className='outline-none px-4 py-2 w-full box-border'/>
                   <MdEmail color='gray'/>
               </div>
               <div className='h-[1px] w-full bg-gray-400'></div>
            </div>
            <div>
               <div className='flex items-center justify-between gap-2 w-full'>
                  <input type={showPassword?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)} required placeholder='Password*' className='outline-none box-border px-4 py-2 w-full'/>
                  {
                   !showPassword ? <IoEye color='gray' onClick={handlePassword} className='cursor-pointer'/> : <IoEyeOff  onClick={handlePassword} className='cursor-pointer' color='gray' />
                  }
               </div>
               <div className="w-full h-2">
            {password? <PasswordStrength password={password} /> : <div className='h-[1px] w-full bg-gray-400'></div>}
            </div>
            </div>
            <div>
               <div className='flex items-center justify-between gap-2 w-full'>
                  <input type={showConfirmPassword?"text":"password"} value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} required placeholder='Confirm password*' className='outline-none box-border px-4 py-2 w-full'/>
                  {
                   !showConfirmPassword ? <IoEye color='gray' onClick={handleConfirmPassword} className='cursor-pointer'/> : <IoEyeOff  onClick={handleConfirmPassword} className='cursor-pointer' color='gray' />
                  }
               </div>
                <div className='h-[1px] w-full bg-gray-400'></div>
            </div>
            <div className='flex items-center justify-end gap-10 w-full mt-4'>
            <div className={`text-[16px] font-serif text-gray-400 cursor-pointer underline ${mobileToggle?"block":"hidden"}`} onClick={()=>setIsLeft(!isLeft)}>Login</div>
            <button className='bg-red-400 text-white rounded-md px-6 py-2'>SIGN UP</button>
            </div>
            <OAuth/>
       </form>
  )
}

export default Signup
