import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getProfile: (state, action) => {
            state.user = action.payload;
        }
    }
})

export const {
    getProfile
} = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;