import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../lib/axios";
import getErrorMsg from "../lib/getErrorMsg";

interface Story {
    _id: string;
    title: string;
    description: string;
    author: string;
    status: string;
    viewsCount?: number;
    followsCount?: number;
    totalChapters?: number;
    bannerImage?: string;
}
interface StoryState {
    story: Story | null;
    listStory: Story[];
    loading: boolean;
    error: string | null;
}
const initialState: StoryState = {
    story: null,
    listStory: [],
    loading: false,
    error: null,
};
export const getListStory = createAsyncThunk<
    { message: string; stories: Story[] },
    void,
    { rejectValue: string }
>("story/list", async (_, thunkAPI) => {
    try {
        const res = await api.get(`/story/list`);   
        return { message: res.data.message, stories: res.data.stories };
    } catch (err) {
        return thunkAPI.rejectWithValue(
            getErrorMsg(err, "Lấy danh sách truyện thất bại")
        );
    }
});

export const getListStoryHot = createAsyncThunk<
    { message: string; stories: Story[] },
    void,
    { rejectValue: string }
>("story/listHot", async (_, thunkAPI) => {
    try {
        const res = await api.get(`/story/list/hot`);
        return { message: res.data.message, stories: res.data.stories };
    } catch (err) {
        return thunkAPI.rejectWithValue(
            getErrorMsg(err, "Lấy danh sách truyện hot thất bại")
        );
    }   
});

export const getListStoryNew = createAsyncThunk<
    { message: string; stories: Story[] },
    void,
    { rejectValue: string }
>("story/listNew", async (_, thunkAPI) => {
    try {
        const res = await api.get(`/story/list/new`);
        return { message: res.data.message, stories: res.data.stories };
    } catch (err) {
        return thunkAPI.rejectWithValue(
            getErrorMsg(err, "Lấy danh sách truyện mới thất bại")
        );
    }
});

export const getListStorySorted = createAsyncThunk<
    { message: string; stories: Story[] },
    { sortBy: string; order: "asc" | "desc" },
    { rejectValue: string }
>("story/list/sorted", async ({ sortBy, order }, thunkAPI) => {
    try {   
        const res = await api.get(`/story/list/sorted?sortBy=${sortBy}&order=${order}`);
        return { message: res.data.message, stories: res.data.stories };
    } catch (err) {
        return thunkAPI.rejectWithValue(
            getErrorMsg(err, "Lấy danh sách truyện sắp xếp thất bại")
        );
    }
});

export const getListStoryRecommended = createAsyncThunk<
    { message: string; stories: Story[] },
    void,   
    { rejectValue: string }
>("story/list/recommended", async (_, thunkAPI) => {
    try {
        const res = await api.get(`/story/list/recommended`);
        return { message: res.data.message, stories: res.data.stories };
    } catch (err) {
        return thunkAPI.rejectWithValue(
            getErrorMsg(err, "Lấy danh sách truyện gợi ý thất bại")
        );
    }
});

export const getDetailStory = createAsyncThunk<
    { message: string; story: Story },
    { slugStory: string },  
    { rejectValue: string }
>("story/detail", async ({ slugStory }, thunkAPI) => {
    try {   
        const res = await api.get(`/story/detail/${slugStory}`);
        return { message: res.data.message, story: res.data.story };
    } catch (err) {
        return thunkAPI.rejectWithValue(
            getErrorMsg(err, "Lấy chi tiết truyện thất bại")
        );
    }   
});

export const createStory = createAsyncThunk<
    { message: string; story: Story },
    { title: string; description: string; author: string; status: string; bannerImage?: string },
    { rejectValue: string }
>("story/create", async ({ title, description, author, status, bannerImage }, thunkAPI) => {
    try {
        const res = await api.post(`/story/create`, { title, description, author, status, bannerImage });
        return { message: res.data.message, story: res.data.story };
    } catch (err) {
        return thunkAPI.rejectWithValue(
            getErrorMsg(err, "Tạo truyện thất bại")
        );
    }
});
export const deleteStory = createAsyncThunk<
    { message: string; storyId: string },
    { storyId: string },
    { rejectValue: string }
>("story/delete", async ({ storyId }, thunkAPI) => {
    try {
        const res = await api.delete(`/story/delete/${storyId}`);
        return { message: res.data.message, storyId: res.data.storyId };
    } catch (err) {
        return thunkAPI.rejectWithValue(
            getErrorMsg(err, "Xóa truyện thất bại")
        );
    }
});

export const searchStory = createAsyncThunk<
    { message: string; stories: Story[] },
    { keyword: string },
    { rejectValue: string }
>("story/search", async ({ keyword }, thunkAPI) => {
    try {
        const res = await api.get(`/story/search?keyword=${keyword}`);
        return { message: res.data.message, stories: res.data.stories };
    } catch (err) {
        return thunkAPI.rejectWithValue(
            getErrorMsg(err, "Tìm truyện thất bại")
        );
    }
});

const storySlice = createSlice({
    name: "story",
    initialState,   
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getListStory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getListStory.fulfilled, (state, action) => {
                state.loading = false;
                state.listStory = action.payload.stories;
            })
            .addCase(getListStory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? null;
            });
        builder
            .addCase(getDetailStory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getDetailStory.fulfilled, (state, action) => {
                state.loading = false;
                state.story = action.payload.story;
            })
            .addCase(getDetailStory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? null;
            });
        builder
            .addCase(createStory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createStory.fulfilled, (state, action) => {
                state.loading = false;
                state.story = action.payload.story;
            })
            .addCase(createStory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? null;
            });
        builder
            .addCase(deleteStory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteStory.fulfilled, (state, action) => {
                state.loading = false;
                state.listStory = state.listStory.filter(
                    (story) => story._id !== action.payload.storyId
                );
            })
            .addCase(deleteStory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? null;
            });
        builder
            .addCase(searchStory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchStory.fulfilled, (state, action) => {
                state.loading = false;
                state.listStory = action.payload.stories;
            })
            .addCase(searchStory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? null;
            });
    },
});

const storyReducer = storySlice.reducer;
export default storyReducer;