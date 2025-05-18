import {createSlice} from '@reduxjs/toolkit';

const storedToken = localStorage.getItem('token');

export const userSlice = createSlice({
    name : 'user',
    initialState: {
        user: null,
        token: storedToken || null,
        isVerifying : false,
    },
    reducers: {
        setUser: (state, action) => {
            if(action.payload.user) state.user = action.payload.user;
            if(action.payload.token) state.token = action.payload.token;
            if(state.payload?.isVerifying) state.isVerifying = action.payload.isVerifying;
            if (action.payload.token) localStorage.setItem('token', action.payload.token);
        },
        logoutUser: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
            state.isVerifying = false;
        }
    }
});

export const {setUser, logoutUser} = userSlice.actions;
export default userSlice.reducer;