import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../lib/axios";
import getErrorMsg from "../lib/getErrorMsg";
import toast from "react-hot-toast";
import { Category } from "./categorySlice";
import { Story } from "./storySlice";

interface CategoryStory {
  _id: string;
  categoryId: Category;
  storyId: Story;
  createdAt: string;
  updatedAt: string;
}

interface CategoryStoryState {
    categoryStory: CategoryStory | null;
    listCategoryStory: CategoryStory[];
    loading: boolean;
    error: string | null;
}

const initialState: CategoryStoryState = {
    categoryStory: null,
    listCategoryStory: [],
    loading: false,
    error: null,
};

export const getListStoryCategory = createAsyncThunk<
    { message: string; categoryStories: CategoryStory[] },
    void,
    { rejectValue: string }
>("categoryStory/list", async (_, thunkAPI) => {
    try {
        const res = await api.get(`/storyCategory/list`);
        return { message: res.data.message, categoryStories: res.data.categoryStories };
    } catch (err) {
        return thunkAPI.rejectWithValue(getErrorMsg(err, "Lấy danh sách thể loại truyện thất bại"));
    }
});

export const getListStoryCategoryBySlugCategory = createAsyncThunk<
    { message: string; categoryStories: CategoryStory[] },
    {slugCategory: string},
    { rejectValue: string }
>("categoryStory/listStory", async ({slugCategory}, thunkAPI) => {
    try {
        const res = await api.get(`/storyCategory/listStory/${slugCategory}`);
        return { message: res.data.message, categoryStories: res.data.categoryStories };
    } catch (err) {
        return thunkAPI.rejectWithValue(getErrorMsg(err, "Lấy danh sách thể loại truyện thất bại"));
    }
});

export const createCategoryStory = createAsyncThunk<
    { message: string; categoryStory: CategoryStory },
    { categoryId: string; storyId: string },
    { rejectValue: string }
>("categoryStory/create", async ({ categoryId, storyId }, thunkAPI) => {
    try {
        const res = await api.post(`/storyCategory/create`, { categoryId, storyId });
        toast.success("Tạo thể loại truyện thành công");
        return { message: res.data.message, categoryStory: res.data.categoryStory };
    } catch (err) {
        toast.error("Tạo thể loại truyện thất bại");
        return thunkAPI.rejectWithValue(getErrorMsg(err, "Tạo thể loại truyện thất bại"));
    }
});


export const deleteCategoryStory = createAsyncThunk<
    { message: string; categoryStoryId: string },
    { categoryId: string; storyId: string },
    { rejectValue: string }
>("categoryStory/delete", async ({ categoryId, storyId }, thunkAPI) => {
    try {
        const res = await api.delete(`/storyCategory/delete/${storyId}/${categoryId}`);
        toast.success("Xóa thể loại truyện thành công");
        return { message: res.data.message, categoryStoryId: res.data.categoryStoryId };
    } catch (err) {
        toast.error("Xóa thể loại truyện thất bại");
        return thunkAPI.rejectWithValue(getErrorMsg(err, "Xóa thể loại truyện thất bại"));
    }
});

export const categoryStorySlice = createSlice({
    name: "categoryStory",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getListStoryCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getListStoryCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.listCategoryStory = action.payload.categoryStories;
            })
            .addCase(getListStoryCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? null;
            });
        builder
            .addCase(getListStoryCategoryBySlugCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getListStoryCategoryBySlugCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.listCategoryStory = action.payload.categoryStories;
            })
            .addCase(getListStoryCategoryBySlugCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? null;
            });
        builder
            .addCase(createCategoryStory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCategoryStory.fulfilled, (state, action) => {
                state.loading = false;
                state.categoryStory = action.payload.categoryStory;
            })
            .addCase(createCategoryStory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? null;
            });
        builder
            .addCase(deleteCategoryStory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCategoryStory.fulfilled, (state, action) => {
                state.loading = false;
                state.listCategoryStory = state.listCategoryStory.filter(
                    (cs) => cs._id !== action.payload.categoryStoryId
                );
            })
            .addCase(deleteCategoryStory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? null;
            });
    },
});

const categoryStoryReducer = categoryStorySlice.reducer;

export default categoryStoryReducer;