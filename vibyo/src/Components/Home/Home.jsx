import React from 'react'
import Sidebar from './Sidebar'
import Contacts from './Contacts'
import ChatRoom from './ChatRoom'
import { useState } from 'react'
import { useThemeColors } from '../../Colors/Colors'

const Home = () => {

  const [isUserSeleted, setIsUserSelected] = useState(true);
  const colors = useThemeColors();

  return (
    <div className='w-full h-screen sm:px-[1em] sm:py-[2em]'>
          <div className={`backdrop-blur-xl border-2 border-gray-600 md:rounded-2xl overflow-y-auto
            h-[100%] w-full grid grid-cols-[60px_1fr] md:grid-cols-[60px_1.5fr_3fr] lg:grid-cols-[60px_1fr_3fr]`}>
            <div className='h-full overflow-y-auto'><Sidebar/></div>  
            <div className='hidden md:block overflow-y-auto h-full'><Contacts/></div>
            {isUserSeleted && <div className='h-full overflow-y-auto'>
              <ChatRoom/>
            </div>}
          </div>
    </div>
  )
}

export default Home
