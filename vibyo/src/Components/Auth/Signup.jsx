import React from 'react'
import { FaUserLarge } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoEye, IoEyeOff  } from "react-icons/io5";
import { useState } from 'react'
import OAuth from './OAuth';

const Signup = ({isLeft,setIsLeft,mobileToggle}) => {
   const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

   const handleShowPassword = () => {
          setShowPassword(!showPassword)
    }
  return (
   <form className='flex flex-col items-between justify-center gap-3 w-full h-full bg-white rounded-md p-6'>
            <div className='text-red-400 font-bold text-3xl'>SIGN UP</div>
            <div>
               <div className='flex items-center justify-between gap-2 w-full'>
                   <input type="text" placeholder='Full Name' required className='outline-none px-4 py-2 w-full box-border'/>
                   <FaUserLarge color='gray'/>
               </div>
               <div className='h-[1px] w-full bg-gray-400'></div>
            </div>
            <div>
               <div className='flex items-center justify-between gap-2 w-full'>
                   <input type="email" placeholder='Email' required className='outline-none px-4 py-2 w-full box-border'/>
                   <MdEmail color='gray'/>
               </div>
               <div className='h-[1px] w-full bg-gray-400'></div>
            </div>
            <div>
               <div className='flex items-center justify-between gap-2 w-full'>
                  <input type={showPassword?"text":"password"} required placeholder='Password' className='outline-none box-border px-4 py-2 w-full'/>
                  {
                   !showPassword ? <IoEye color='gray' onClick={handleShowPassword} className='cursor-pointer'/> : <IoEyeOff  onClick={handleShowPassword} className='cursor-pointer' color='gray' />
                  }
               </div>
               <div className='h-[1px] w-full bg-gray-400'></div>
            </div>
            <div>
               <div className='flex items-center justify-between gap-2 w-full'>
                  <input type={showPassword?"text":"password"} required placeholder='Confirm password' className='outline-none box-border px-4 py-2 w-full'/>
                  {
                   !showPassword ? <IoEye color='gray' onClick={handleShowPassword} className='cursor-pointer'/> : <IoEyeOff  onClick={handleShowPassword} className='cursor-pointer' color='gray' />
                  }
               </div>
               <div className='h-[1px] w-full bg-gray-400'></div>
            </div>
            <div className='flex items-center justify-end gap-10 w-full'>
            <div className={`text-[16px] font-serif text-gray-400 cursor-pointer underline ${mobileToggle?"block":"hidden"}`} onClick={()=>setIsLeft(!isLeft)}>Login</div>
            <button className='bg-red-400 text-white rounded-md px-6 py-2'>SIGN UP</button>
            </div>
            <OAuth/>
       </form>
  )
}

export default Signup
