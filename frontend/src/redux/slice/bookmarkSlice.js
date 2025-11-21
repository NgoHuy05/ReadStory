import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bookmark: null,
}

export const bookmarkSlice = createSlice({
    name: 'bookmark',
    initialState,
    reducers:  {
        test: (state, action) => {
            console.log(state.category, action.payload);
            
        }
    }
})

export const { test } = bookmarkSlice.actions;
const bookmarkReducer = bookmarkSlice.reducer;
export default bookmarkReducer;