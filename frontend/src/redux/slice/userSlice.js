import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveUser: (state, action) => {
            state.user = action.payload;
        },

    }
})

export const {
    saveUser
} = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;