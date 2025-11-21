import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chapter: null,
}

export const chapterSlice = createSlice({
    name: 'chapter',
    initialState,
    reducers: {
        test: (state, action) => {
            console.log(state.chapter, action.payload);
        }
    }
})

export const { test } = chapterSlice.actions;
const chapterReducer = chapterSlice.reducer;
export default chapterReducer;