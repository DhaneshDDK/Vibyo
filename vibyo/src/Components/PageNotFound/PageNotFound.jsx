import React from 'react'
import Button from '../Button/Button'
import UIRoutes from '../../Routes/UIRoutes'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  const navigate = useNavigate();
 
  const handleGoHome = () => {
    navigate(UIRoutes.Home.home)
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center p-5 md:p-24">
  <div className="h-[100%] w-[100%] rounded-lg backdrop-blur-lg border-2  shadow-[0_0_25px_5px_rgba(378,17,70,0.5)] border-gray-700 flex flex-col items-center justify-center p-5">
    <h1 className="text-5xl font-bold text-white mb-4">Page not found</h1>
    <p className="text-gray-400 text-md font-serif mb-6">The page you are looking for could not be found.</p>
    <Button ButtonText={"Go Home"} onClick={handleGoHome}/>
   </div>
   </div>
  )
}

export default PageNotFound
