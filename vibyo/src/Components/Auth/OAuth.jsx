import React from 'react'
import GoogleIcon from '../../assets/Google.png'

const OAuth = () => {
  return (
    <>
    <div className='text-gray-400 text-center'>or you can sign in with</div>
    <div className='flex items-center justify-center gap-4 w-full'>
     <div className='w-fit cursor-pointer p-2 hover:bg-red-200 rounded-md'><img src={GoogleIcon} alt='img' width={15}/></div>
     <div className='w-fit cursor-pointer p-2 hover:bg-red-200 rounded-md'><img src={GoogleIcon} alt='img' width={15}/></div>
     <div className='w-fit cursor-pointer p-2 hover:bg-red-200 rounded-md'><img src={GoogleIcon} alt='img' width={15}/></div>
    </div>
    </>
  )
}

export default OAuth
