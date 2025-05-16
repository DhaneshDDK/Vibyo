import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import { IoArrowBackSharp } from "react-icons/io5";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const OTP = ({email, length = 6}) => {
  const [otp, setOTP] = useState(Array(length).fill(""));
  const inputsRef = useRef(Array(length).fill(null));
  const navigate = useNavigate();
  
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

  const handleResendOTP = () => {
    // Logic to resend OTP
    console.log("Resending OTP...");
  }

  const handleVerify = () => {
    // Logic to verify OTP
    const otpString = otp.join("");
    if(otpString.length !== length) {
        toast.warn("Please enter a valid OTP");
        return;
    }
    console.log("Verifying OTP:", otpString);
  }
  return (
    <div className='w-screen h-screen bg-BlueBackground flex items-center justify-center '>
        <div className='border-2 w-[90%] md:w-[50%] lg:w-[35%] border-white shadow-lg rounded-2xl p-10 flex flex-col items-start justify-center gap-5'>
            <div className='flex items-center justify-center gap-2 cursor-pointer' onClick={()=>navigate(-1   )}><IoArrowBackSharp/> <div>Back</div></div>
            <h2 className='text-2xl md:text-3xl font-bold'>Email Verification</h2>
            <div className='text-gray-500 text-sm font-serif'>Enter the {length}-digit verification code sent to {email}</div>
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
            <div className='text-[16px] font-serif text-gray-400'
            >Didn't recieve OTP? <span className='text-gray-500 underline cursor-pointer'
            onClick={handleResendOTP}
            >Resend OTP</span></div>
            <button className='bg-red-400 text-white rounded-md px-6 py-2 self-center'
            onClick={handleVerify}
            >Verify</button>
        </div>
        
    </div>
  )
}

export default OTP
