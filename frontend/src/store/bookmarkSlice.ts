import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getErrorMsg from "../lib/getErrorMsg";
import api from "../lib/axios";
import toast from "react-hot-toast";

interface Bookmark {
  userId: string;
  storyId: string;
}

interface BookmarkState {
  bookmark: Bookmark | null;
  loading: boolean;
  error: string | null;
}

const initialState: BookmarkState = {
  bookmark: null,
  loading: false,
  error: null,
};

export const createBookmark = createAsyncThunk<
  { message: string; bookmark: Bookmark },
  { storyId: string },
  { rejectValue: string }
>("bookmark/create", async (data, thunkAPI) => {
  try {
    const res = await api.post("/bookmark/create", data);
    toast.success("Đã thêm vào mục yêu thích");
    return {
      message: res.data.message,
      bookmark: res.data.bookmark,
    };
  } catch (err) {
    toast.error("Tạo bookmark thất bại");
    return thunkAPI.rejectWithValue(getErrorMsg(err, "Tạo bookmark thất bại"));
  }
});

export const deleteBookmark = createAsyncThunk<
  string,
  { storyId: string },
  { rejectValue: string }
>("bookmark/delete", async ({ storyId }, thunkAPI) => {
  try {
    await api.delete(`/bookmark/${storyId}`);
    toast.success("Đã xóa khỏi mục yêu thích");
    return storyId;
  } catch (err) {
    toast.error("Xóa bookmark thất bại");
    return thunkAPI.rejectWithValue(getErrorMsg(err, "Xóa bookmark thất bại"));
  }
});

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBookmark.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBookmark.fulfilled, (state, action) => {
        state.loading = false;
        state.bookmark = action.payload.bookmark;
      })
      .addCase(createBookmark.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      })

      .addCase(deleteBookmark.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBookmark.fulfilled, (state) => {
        state.loading = false;
        state.bookmark = null;
      })
      .addCase(deleteBookmark.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      });
  },
});

const bookmarkReducer = bookmarkSlice.reducer
export default bookmarkReducer;
