import {createSlice} from '@reduxjs/toolkit';

const storedToken = localStorage.getItem('token');

export const userSlice = createSlice({
    name : 'user',
    initialState: {
        user: null,
        token: storedToken || null,
        isVerifying : false,
        isDarkTheme : true
    },
    reducers: {
        setUser: (state, action) => {
            if(action.payload.user) state.user = action.payload.user;
            if(action.payload.token) state.token = action.payload.token;
            if(state.payload?.isVerifying) state.isVerifying = action.payload.isVerifying;
            if (action.payload.token) localStorage.setItem('token', action.payload.token);
        },
        setTheme : (state, action)=>{
            if(action.payload.isDarkTheme !== undefined) state.isDarkTheme = action.payload.isDarkTheme
        },
        logoutUser: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
            state.isVerifying = false;
        }
    }
});

export const {setUser, logoutUser, setTheme} = userSlice.actions;
export default userSlice.reducer;