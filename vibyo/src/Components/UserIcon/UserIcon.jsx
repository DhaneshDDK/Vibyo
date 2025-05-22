import React from 'react'
import { useSelector } from 'react-redux';

const UserIcon = () => {
  const {user} = useSelector((state)=>state.user);
  return (
       <img src={user?.profile_photo_url} alt="image" className='h-8 w-8 rounded-full'/>
  )
}
export default UserIcon
