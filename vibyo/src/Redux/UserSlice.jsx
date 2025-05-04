import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name : 'user',
    initialState: {
        user: null,
        token: localStorage.getItem('token') || null,
        isLoggedIn: !!localStorage.getItem('token'),
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
            localStorage.setItem('token', action.payload.token);
        },
        logoutUser: (state) => {
            state.user = null;
            state.token = null;
            state.isLoggedIn = false;
            localStorage.removeItem('token');
        }
    }
});

export const {setUser, logoutUser} = userSlice.actions;
export default userSlice.reducer;