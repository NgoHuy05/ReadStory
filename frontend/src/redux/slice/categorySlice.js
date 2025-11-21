import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: null,
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducer:  {
        test: (state, action) => {
            console.log(state.category, action.payload);
            
        }
    }
})

export const { test } = categorySlice.actions;
const categoryReducer = categorySlice.reducer;
export default categoryReducer;