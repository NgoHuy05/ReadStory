import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    comment: null,
}

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducer:  {
        test: (state, action) => {
            console.log(state.category, action.payload);
            
        }
    }
})

export const { test } = commentSlice.actions;
const commentReducer = commentSlice.reducer;
export default commentReducer;