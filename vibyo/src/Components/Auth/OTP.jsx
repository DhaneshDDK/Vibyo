import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import { IoArrowBackSharp } from "react-icons/io5";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { GetMethod, PostMethod } from '../../ApiService/Auth';
import ServerRoutes from '../../Routes/Constants'
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../Redux/UserSlice';
import Button from '../Button/Button';
import Logo from '../../assets/Logo.png'

const OTP = ({email, length = 6}) => {
  const [otp, setOTP] = useState(Array(length).fill(""));
  const inputsRef = useRef(Array(length).fill(null));
  const navigate = useNavigate();
  const {user} = useSelector(state=>state.user);
  const dispatch = useDispatch();

  const handleOTPChange = (e, index) => {
    const value = e.target.value.slice(0,1);
    if (/^[0-9]?$/.test(value)) {
      const newOTP = [...otp];
      newOTP[index] = value;
      inputsRef.current[index].value = value; 
      setOTP(newOTP);
      if (value && index < length - 1) {
        inputsRef.current[index + 1].focus();
      }
    }
  };
  
  const handleKeyDown = (e, index) => {
    const isDigit = /^[0-9]$/.test(e.key);
    if(!isDigit && e.key !== "Backspace" && e.key !== "Delete" && e.key !== "ArrowLeft" && e.key !== "ArrowRight"){
       return;
    }

    const isCurorPosAtStart = e.target.selectionStart === 0;
    const isCurorPosAtEnd = e.target.selectionStart === e.target.value.length;
    const newOTP = [...otp];
    if(e.key === "Delete") {
        newOTP[index] = "";
        inputsRef.current[index].value = ""; 
    }
    else if(e.key === "ArrowLeft"){
        if(index > 0) inputsRef.current[index - 1].focus();
    }else if(e.key === "ArrowRight"){   
        if(index < length - 1) inputsRef.current[index + 1].focus();
    }
    else if(isCurorPosAtStart){
        if(e.key === "Backspace" && index > 0){
            inputsRef.current[index - 1].focus();
            newOTP[index - 1] = "";
            inputsRef.current[index - 1].value = "";
        }else if(e.key === "Backspace" && index === 0){
            newOTP[index] = "";
            inputsRef.current[index].value = "";
        }else if(isDigit && newOTP[index] !== ""){
            if (index + 1 < length && newOTP[index + 1] !== "") {
                for (let i = length - 1; i > index; i--) {
                  newOTP[i] = newOTP[i - 1];  
                  inputsRef.current[i].value = newOTP[i]; 
                }
              }
            newOTP[index] = e.key;
            inputsRef.current[index].value = e.key;
            if(index < length - 1) {
                inputsRef.current[index + 1].focus();
                inputsRef.current[index + 1].setSelectionRange(0, 0);
            }
        }
    }
    else if(isCurorPosAtEnd){
       if(e.key === "Backspace"){
            newOTP[index] = "";
            inputsRef.current[index].value = "";
        }
        else if(isDigit && newOTP[index] !== "" && index < length - 1){
            if (index + 1 < length && newOTP[index + 1] !== "") {
                for (let i = length - 1; i > index+1; i--) {
                  newOTP[i] = newOTP[i - 1];
                  inputsRef.current[i].value = newOTP[i]; 
                }
              }
            newOTP[index+1] = e.key;
            inputsRef.current[index+1].value = e.key;
            inputsRef.current[index + 1].focus();
            inputsRef.current[index + 1].setSelectionRange(0, 0);
        }
    }
    setOTP(newOTP);
  }
  

  useEffect(()=>{
    inputsRef.current[0]?.focus();
  },[])

  const handleResendOTP = async () => {
    // Logic to resend OTP
     if(user){
      try {
        const response = await GetMethod(ServerRoutes.Auth.resendOTP);
        const responseData = await response.json();
        console.log(responseData)
        if(response.status === 200) toast.success("OTP sent successfully")
        else toast.error(responseData.message)
     } catch (error) {
        toast.error("Failed sending otp");
     }
     }else{
      toast.warning("User is not found");
     }
  }

  const handleVerify = async() => {
    // Logic to verify OTP
    const otpString = otp.join("");
    if(otpString.length !== length) {
        toast.warn("Please enter a valid OTP");
        return; 
    }
    try {
       const response = await PostMethod(ServerRoutes.Auth.verifyOTP,{otp:otpString});
       const responseData = await response.json();
       if(response.status===200) {
        dispatch(setUser({user:responseData.user, token : responseData.token}));
        toast.success("OTP verified");
      }else toast.error(responseData.message)
    } catch (error) {
       console.log(error);
       toast.error("Failed verifying OTP")
    }
  }
  return (
    <div className='relative w-screen h-screen bg-gray-900 flex items-center justify-center '>
        <div className='border-2 w-[90%] md:w-[50%] lg:w-[35%] border-white shadow-lg rounded-2xl p-10 flex flex-col items-start justify-center gap-5'>
            <div className='flex items-center justify-center gap-2 text-gray-400 cursor-pointer' onClick={()=>navigate(-1)}><IoArrowBackSharp/> <div>Back</div></div>
            <h2 className='text-2xl md:text-3xl font-bold text-gray-100'>Email Verification</h2>
            <div className='text-gray-500 text-sm font-serif'>Enter the {length}-digit verification code sent to {email?? user?.email}</div>
            <div className='flex items-center justify-center gap-1 md:gap-2 w-full'>
                {
                    otp.map((value, index) => {
                        return (
                            <input
                                key={index}
                                type="text"
                                value={value}
                                inputMode='numeric'
                                maxLength={1}
                                onKeyDown={(e) => {
                                    handleKeyDown(e, index);
                                }}
                                onChange={(e) => {
                                    handleOTPChange(e, index);
                                }}
                                ref={(el) => (inputsRef.current[index] = el)}
                                className="md:w-10 md:h-10 w-7 h-7 border border-gray-300 outline-red-400 rounded text-center text-xl mx-1"
                            />
                        );
                    })
                }
            </div>
            <div className='text-[16px] font-serif text-gray-500'
            >Didn't recieve OTP? <span className='text-gray-300 underline cursor-pointer'
            onClick={handleResendOTP}
            >Resend OTP</span></div>
            <div className='self-center'><Button ButtonText={"Verify"} onClick={handleVerify}/></div>
            <p className=' font-serif text-red-600 text-sm self-center select-none'>Dont share OTP with anyone</p>
        </div>
      <div className={`z-[-10] md:z-[0] absolute left-10 top-10 flex items-center justify-center gap-4`}>
         <img src={Logo} alt="logo" className='md:w-70' width={30}/> 
         <div className={`font-serif text-lg md:text-3xl text-white`}>VIBYO</div>
       </div>
     <div className='z-[0] absolute bottom-4 text-center w-full text-sm text-gray-500'>© 2025 Vibyo. All rights reserved. Chennai</div>
    </div>
  )
}

export default OTP
