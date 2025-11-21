import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    storyCategory: null,
}

export const storyCategorySlice = createSlice({
    name: 'storyCategory',
    initialState,
    reducers:  {
        test: (state, action) => {
            console.log(state.category, action.payload);
            
        }
    }
})

export const { test } = storyCategorySlice.actions;
const storyCategoryReducer = storyCategorySlice.reducer;
export default storyCategoryReducer;