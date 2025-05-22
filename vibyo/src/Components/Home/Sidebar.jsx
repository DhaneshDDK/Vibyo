import React, {useState} from 'react'
import AppLogo from '../../assets/Logo.png'
import {useThemeColors} from '../../Colors/Colors'
import ThemeSelector from '../ThemeSelector/ThemeSelector'
import { useSelector } from 'react-redux'
import UserIcon from '../UserIcon/UserIcon'
import { LuMessageCircleMore } from "react-icons/lu";
import { IoCallOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosRadioButtonOn } from "react-icons/io";

const Sidebar = () => {
  const colors = useThemeColors();
  const {user, isDarkTheme} = useSelector((state)=>state.user);
  const icons = [LuMessageCircleMore, IoCallOutline, IoIosRadioButtonOn];
  const [activeIcon, setActiveIcon] = useState(0);

  return (
    <div className={`h-full w-[60px] flex flex-col justify-between py-5 items-center gap-5 md:rounded-l-2xl`} 
    style={{backgroundColor:colors.SidebarBg}}
    >
        <div className='flex flex-col items-center justify-center gap-8'>
            <div className={`w-[35px] h-[35px] rounded-lg flex items-center justify-center`}
            style={{backgroundColor:colors.AppLogoBg}}
            >
                <img src={AppLogo} alt="image" width={25}/>
            </div>
            {
                icons.map((Icon, index) => (
                    <div key={index} className='cursor-pointer relative'>
                      {
                        activeIcon === index && (
                            <div className='absolute w-[8px] h-[8px] rounded-full bg-blue-500 top-0 left-0 translate-x-[-50%] translate-y-[-50%]'></div>
                        )}
                        <Icon size={25} color={isDarkTheme? "white" : "black"} onClick={() => setActiveIcon(index)} />
                    </div>
                ))
            }
            <div className='w-[100%] h-[1px] bg-gray-500'></div>
            <div className='cursor-pointer'><IoSettingsOutline size={25} color={isDarkTheme? "white" : "black"}/></div>
        </div>
        <div className='flex flex-col items-center justify-center gap-8'>
             <ThemeSelector/>
             <UserIcon/>
        </div>
    </div>
  )
}

export default Sidebar
