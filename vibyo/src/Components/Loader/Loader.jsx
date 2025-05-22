import React from 'react'
import { MoonLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        <MoonLoader
        color="white"
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> 
    </div>
  )
}

export default Loader
