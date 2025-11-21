import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    story: null,
}

export const storySlice = createSlice({
    name: 'story',
    initialState,
    reducers: {
        test: (state, action) => {
            console.log(state.story, action.payload);
        }
    }
})

export const {
    test
} = storySlice.actions;
const storyReducer = storySlice.reducer;
export default storyReducer;