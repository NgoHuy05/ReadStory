import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    history: null,
}

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducer:  {
        test: (state, action) => {
            console.log(state.category, action.payload);
            
        }
    }
})

export const { test } = historySlice.actions;
const historyReducer = historySlice.reducer;
export default historyReducer;