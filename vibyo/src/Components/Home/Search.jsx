import React from 'react'
import { LiaSearchSolid } from "react-icons/lia";
import { useSelector } from 'react-redux';
import { useThemeColors } from '../../Colors/Colors';
const Search = () => {
    const {isDarkTheme} = useSelector((state)=>state.user);
    const colors = useThemeColors();
  return (
    <div>
        <div className={`flex items-center justify-center gap-2 py-3 px-4 rounded-full mt-5`}
        style={{ backgroundColor : isDarkTheme? '#282142' : colors.SidebarBg }}>
            <LiaSearchSolid size={20} color={isDarkTheme? 
                "white" : "black"
            }/>
            <input type="text" placeholder='Search or start a new chat' className='bg-transparent border-none outline-none placeholder:[#c8c8c8] flex-1'
            style={{color : colors.searchTextColor}}/>
        </div>
    </div>
  )
}

export default Search
