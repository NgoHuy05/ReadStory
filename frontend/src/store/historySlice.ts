import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getErrorMsg from "../lib/getErrorMsg";
import api from "../lib/axios";
import toast from "react-hot-toast";

interface History {
  _id: string;
  userId: string;
  storyId: string;
  chapterId: string;
}

interface HistoryState {
  history: History | null;
  listHistory: History[];
  loading: boolean;
  error: string | null;
}
const initialState: HistoryState = {
  history: null,
  listHistory: [],
  loading: false,
  error: null,
};

export const createHistory = createAsyncThunk<
  { message: string; history: History },
  { storyId: string; chapterId: string },
  { rejectValue: string }
>("history/create", async ({ storyId, chapterId }, thunkAPI) => {
  try {
    const res = await api.post("/history/create", { storyId, chapterId });
    toast.success("Cập nhật lịch sử đọc thành công");
    return { message: res.data.message, history: res.data.history };
  } catch (err) {
    toast.error("Tạo lịch sử thất bại");
    return thunkAPI.rejectWithValue(getErrorMsg(err, "Tạo lịch sử thất bại"));
  }
});

export const deleteHistory = createAsyncThunk<
  { message: string; historyId: string },
  { storyId: string; chapterId: string },
  { rejectValue: string }
>("history/delete", async ({ storyId, chapterId }, thunkAPI) => {
  try {
    const res = await api.delete(`/history/delete/${storyId}/${chapterId}`);
    toast.success("Xóa lịch sử đọc thành công");
    return { message: res.data.message, historyId: res.data.historyId };
  } catch (err) {
    toast.error("Xóa lịch sử thất bại");
    return thunkAPI.rejectWithValue(getErrorMsg(err, "Xóa lịch sử thất bại"));
  }
});

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload.history;
        state.listHistory.unshift(action.payload.history);
      })
      .addCase(createHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      });
    builder
      .addCase(deleteHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.listHistory = state.listHistory.filter(
          (history) => history._id !== action.payload.historyId
        );
      })
      .addCase(deleteHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      });
  },
});

const historyReducer = historySlice.reducer;
export default historyReducer;
