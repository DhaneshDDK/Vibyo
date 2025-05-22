import React from 'react'
import {useThemeColors} from '../../Colors/Colors'
import { useSelector } from 'react-redux';
import { setTheme } from '../../Redux/UserSlice';
import { useDispatch } from 'react-redux';
import { IoPartlySunnyOutline } from "react-icons/io5";
import { MdModeNight } from "react-icons/md";

const ThemeSelector = () => {
  const dispatch = useDispatch();
  const colors = useThemeColors();
  const {isDarkTheme} = useSelector((state)=>state.user);
  const toggleTheme = ()=>{
       const newTheme = !isDarkTheme;
       dispatch(setTheme({isDarkTheme:newTheme}));
  }
  return (
    <button
      onClick={() =>(toggleTheme())}
      aria-label="Toggle Theme"
      className={`
        relative inline-flex items-center h-6 w-12 rounded-full
        transition-colors duration-300 focus:outline-none
      `}
      style={{backgroundColor:colors.themeToggleBg}}
    >
      <span
        className={`
          absolute left-1 transition-transform duration-300
          h-5 w-5 rounded-full bg-white shadow-md flex items-center justify-center
          ${isDarkTheme ? "translate-x-5" : "translate-x-0"}
        `}
      >
        {isDarkTheme ? (
          <MdModeNight size={15} className="text-gray-800" />
        ) : (
          <IoPartlySunnyOutline size={15} className="text-yellow-500" />
        )}
      </span>
    </button>
  )
}

export default ThemeSelector
