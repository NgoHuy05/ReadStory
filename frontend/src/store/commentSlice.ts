import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../lib/axios";
import getErrorMsg from "../lib/getErrorMsg";
import { User } from "./authSlice";
import { Chapter } from "./chapterSlice";
import toast from "react-hot-toast";

export interface Comment {
  _id: string;
  userId: User;
  storyId: string;
  chapterId: Chapter | null;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface CommentState {
  listCommentChapter: Comment[];
  listCommentStory: Comment[];
  comment: Comment | null;
  loading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  listCommentChapter: [],
  listCommentStory: [],
  comment: null,
  loading: false,
  error: null,
};

export const getListCommentByChapter = createAsyncThunk<
  { message: string; comments: Comment[] },
  { slugChapter: string },
  { rejectValue: string }
>("comment/listByChapter", async ({ slugChapter }, thunkAPI) => {
  try {
    const res = await api.get(`/comment/list/chapter/${slugChapter}`);
    return { message: res.data.message, comments: res.data.comments };
  } catch (err) {
    return thunkAPI.rejectWithValue(getErrorMsg(err, "Lấy danh sách bình luận thất bại"));
  }
});

export const getListCommentByStory = createAsyncThunk<
  { message: string; comments: Comment[] },
  { slugStory: string },
  { rejectValue: string }
>("comment/listByStory", async ({ slugStory }, thunkAPI) => {
  try {
    const res = await api.get(`/comment/list/story/${slugStory}`);
    return { message: res.data.message, comments: res.data.comments };
  } catch (err) {
    return thunkAPI.rejectWithValue(getErrorMsg(err, "Lấy danh sách bình luận thất bại"));
  }
});

export const createComment = createAsyncThunk<
  { message: string; comment: Comment },
  { storyId: string; chapterId: string | null; content: string },
  { rejectValue: string }
>("comment/create", async ({ storyId, chapterId, content }, thunkAPI) => {
  try {
    const res = await api.post("/comment/create", {
      storyId,
      chapterId,
      content,
    });
    toast.success("Tạo bình luận thành công");
    return { message: res.data.message, comment: res.data.comment };
  } catch (err) {
    toast.error("Tạo bình luận thất bại");
    return thunkAPI.rejectWithValue(getErrorMsg(err, "Tạo bình luận thất bại"));
  }
});

export const deleteComment = createAsyncThunk<
  { message: string; commentId: string },
  { commentId: string },
  { rejectValue: string }
>("comment/delete", async ({ commentId }, thunkAPI) => {
  try {
    const res = await api.delete(`/comment/delete/${commentId}`);
    toast.success("Xóa bình luận thành công");
    return { message: res.data.message, commentId };
  } catch (err) {
    toast.error("Xóa bình luận thất bại");
    return thunkAPI.rejectWithValue(getErrorMsg(err, "Xóa bình luận thất bại"));
  }
});

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getListCommentByChapter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getListCommentByChapter.fulfilled, (state, action) => {
        state.loading = false;
        state.listCommentChapter = action.payload.comments;
      })
      .addCase(getListCommentByChapter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      });
    builder
      .addCase(getListCommentByStory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getListCommentByStory.fulfilled, (state, action) => {
        state.loading = false;
        state.listCommentStory = action.payload.comments;
      })
      .addCase(getListCommentByStory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      });
    builder
      .addCase(createComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comment = action.payload.comment;
        state.listCommentStory.unshift(action.payload.comment);
        state.listCommentChapter.unshift(action.payload.comment);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      });
    builder
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.listCommentStory = state.listCommentStory.filter(
          (c) => c._id !== action.payload.commentId
        );
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      });
  },
});

const commentReducer = commentSlice.reducer;
export default commentReducer;
