import React from 'react'
import BackgroundText from './BackgroundText'
import Logo from '../../assets/Logo.png'
import { useState } from 'react'

const Auth = () => {
  const [mobileToggle, setMobileToggle] = useState((window.innerWidth < 768 || window.innerHeight < 580) ? true : false);
  return (
    <div className='w-screen h-screen bg-BlueBackground flex items-center justify-center'>
       <div className={`absolute ${mobileToggle?"right-10 top-10":"left-10 top-10"} flex items-center justify-center gap-4`}>
         <img src={Logo} alt="logo" width={mobileToggle? 40: 70}/> 
         <div className={`font-serif ${mobileToggle?"text-xl":"text-3xl"}`}>VIBYO</div>
       </div>
       <BackgroundText mobileToggle={mobileToggle} setMobileToggle={setMobileToggle}/>
      {/* <div className='z-[0] absolute bottom-2 text-center w-full text-sm text-gray-500'>© 2025 Vibyo. All rights reserved. Chennai</div> */}
    </div>
  )
}

export default Auth
