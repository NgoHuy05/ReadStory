import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: null,
    isLogin: false,
    isAuthLoading: true,   
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.isLogin = true;
        },
        logOut: (state) => {
            state.accessToken = null;
            state.isLogin = false;
        },
        finishLoading: (state) => {
            state.isAuthLoading = false;   
        },
    },
});

export const { setCredentials, logOut, finishLoading } = authSlice.actions;
export default authSlice.reducer;
