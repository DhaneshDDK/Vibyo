import React, { useEffect } from 'react'
import { useState } from 'react'
import Login from './Login'
import { debounce } from 'lodash';
import Signup from './Signup'

const BackgroundText = ({mobileToggle,setMobileToggle}) => {
  const [isLeft, setIsLeft] = useState(false);
  const [toggleComponent, setToggleComponent] = useState(isLeft ? <Signup isLeft = {isLeft} setIsLeft = {setIsLeft} mobileToggle={mobileToggle}/> : <Login isLeft = {isLeft} setIsLeft = {setIsLeft} mobileToggle={mobileToggle}/>);
 
  const handleResize = debounce(() => {
    setMobileToggle(window.innerWidth < 768 || window.innerHeight < 580);
  }, 500);

  useEffect(()=>{
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  },[mobileToggle])

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setToggleComponent(isLeft ? <Signup isLeft = {isLeft} setIsLeft = {setIsLeft} mobileToggle={mobileToggle}/> : <Login isLeft = {isLeft} setIsLeft = {setIsLeft} mobileToggle={mobileToggle}/>)
    },100);
    return () => clearTimeout(timer);
  },[isLeft, setIsLeft, mobileToggle])
  
const fetchText = (left = true)=>{
  const text = {
    left: {
      heading: "Don't have an account?",
      subtext: "Join now to start high-quality video calls and real-time messaging with your team or friends.",
      button: "SIGN UP",
    },
    right: {
      heading: "Have an account?",
      subtext: "Log in to connect instantly, join meetings, or continue your last conversation seamlessly.",
      button: "LOGIN",
    },
  };
  
  return (
    <div className={`flex flex-col justify-center items-start gap-6 w-1/2`}>
      <div className="text-xl md:text-3xl lg:text-[40px] font-semibold text-gray-500">{left ? text.left.heading : text.right.heading}</div>
      <div className="text-md max-w-[80%] text-gray-500">
        {left ? text.left.subtext : text.right.subtext}
      </div>
      <button
        className={`px-5 py-2 text-md border-2 font-semibold border-white rounded-md w-fit text-gray-200 hover:bg-white hover:text-black transition`}
        onClick={() => setIsLeft(!isLeft)}
      >
        {left ? text.left.button : text.right.button}
      </button>
    </div>
  );
  
}


  return (
    <>
    <div className={`relative ${mobileToggle? "hidden" : "flex"} items-center justify-center gap-24 w-[90%] lg:w-[70%] h-[22em] bg-[rgba(10,4,4,0.1)] backdrop-blur-md py-6 px-10 
     shadow-[0_0_25px_5px_rgba(378,17,70,0.5)] rounded-md border-2 border-gray-700`}>
        {fetchText(true)} 
        {fetchText(false)}
        <div className={`absolute z-10 w-1/2 h-[32em] bg-white ${mobileToggle? "":"-top-[5em]"} rounded-md transition-all duration-500 ${isLeft ? 'translate-x-[-51%]' : 'translate-x-[51%]'}`}>
            {toggleComponent}
        </div>
    </div>
    <>
     {mobileToggle && toggleComponent}
    </>
    </>
  )
}

export default BackgroundText
