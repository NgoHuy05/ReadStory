import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken:  null,
    isLogin: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.isLogin = true;
        },
        logOut: (state) => {
            state.accessToken = null;
            state.isLogin = false;
        }
    }
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
