import {createSlice} from '@reduxjs/toolkit';

const storedToken = localStorage.getItem('token');

export const userSlice = createSlice({
    name : 'user',
    initialState: {
        user: null,
        token: storedToken || null,
        isVerifying : true || !!storedToken,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            if (action.payload.token) {
              localStorage.setItem('token', action.payload.token);
            } else {
              localStorage.removeItem('token');
            }
            state.isVerifying = false;
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