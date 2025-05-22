import React from 'react'

const Button = ({ButtonText,loading=false,onClick}) => {
  return (
     <button className='bg-red-400 hover:bg-gray-800 transition-all duration-200 ease-in-out text-white rounded-md px-6 py-2'
      disabled={loading}
      onClick={onClick}
     >{ButtonText}</button>
  )
}

export default Button
