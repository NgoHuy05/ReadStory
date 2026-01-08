import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getErrorMsg from "../lib/getErrorMsg";
import api from "../lib/axios";
import { Story } from "./storySlice";
import toast from "react-hot-toast";
import { Status } from "./authSlice";

export interface Chapter {
  _id: string;
  storyId: Story;
  title: string;
  content: string;
  chapterNumber: number;
  viewsNumber: number;
  commentsNumber: number;
  createdAt: string;
  updatedAt: string;
  slug: string;
}

interface ChapterState {
  chapter: Chapter | null;
  listChapter: Chapter[];
  error: string | null;
  status: Status
}

const initialState: ChapterState = {
  chapter: null,
  listChapter: [],
  status: "idle",
  error: null,
};


export const getDetailChapter = createAsyncThunk<
  { message: string; chapter: Chapter },
  { slugChapter: string },
  { rejectValue: string }
>("chapter/detail", async ({slugChapter}, thunkAPI) => {
  try {
    const res = await api.get(`/chapter/detail/${slugChapter}`);
    return { message: res.data.message, chapter: res.data.chapter };
  } catch (err) {
    return thunkAPI.rejectWithValue(getErrorMsg(err, "Lấy chi tiết chương thất bại"));
  }
});

export const createChapter = createAsyncThunk<
  { message: string; chapter: Chapter },
  { storyId: string; title: string; content: string; chapterNumber: number },
  { rejectValue: string }
>("chapter/create", async (data, thunkAPI) => {
  try {
    const res = await api.post(`/chapter/create`, data);
    toast.success("Tạo chương thành công");
    return { message: res.data.message, chapter: res.data.chapter };
  } catch (err) {
    toast.error("Tạo chương thất bại");
    return thunkAPI.rejectWithValue(getErrorMsg(err, "Tạo chương thất bại"));
  }
});

export const deleteChapter = createAsyncThunk<
  { message: string, id: string },
  { id: string },
  { rejectValue: string }
>("chapter/delete", async ({id}, thunkAPI) => {
  try {
    const res = await api.delete(`/chapter/delete/${id}`);
    toast.success("Xóa chương thành công");
    return { message: res.data.message, id };
  } catch (err) {
    toast.error("Xóa chương thất bại");
    return thunkAPI.rejectWithValue(getErrorMsg(err, "Xóa chương thất bại"));
  }
});

const chapterSlice = createSlice({
  name: "chapter",
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(getDetailChapter.pending, (state) => {
        state.status = "loading"
        state.error = null;
      })
      .addCase(getDetailChapter.fulfilled, (state, action) => {
        state.status = "success"
        state.chapter = action.payload.chapter;
      })
      .addCase(getDetailChapter.rejected, (state, action) => {
        state.status = "error"
        state.error = action.payload ?? null;
      });
    builder
      .addCase(createChapter.pending, (state) => {
        state.status = "loading"
        state.error = null;
      })
      .addCase(createChapter.fulfilled, (state, action) => {
        state.status = "success"
        state.chapter = action.payload.chapter;
        state.listChapter.unshift(action.payload.chapter)
      })
      .addCase(createChapter.rejected, (state, action) => {
        state.status = "error"
        state.error = action.payload ?? null;
      });
    builder
      .addCase(deleteChapter.pending, (state) => {
        state.status = "loading"
        state.error = null;
      })
      .addCase(deleteChapter.fulfilled, (state, action) => {
        state.status = "success"
        state.listChapter = state.listChapter.filter((c) => c._id !== action.payload.id)
      })
      .addCase(deleteChapter.rejected, (state, action) => {
        state.status = "error"
        state.error = action.payload ?? null;
      })
  },
});

const chapterReducer = chapterSlice.reducer;
export default chapterReducer;