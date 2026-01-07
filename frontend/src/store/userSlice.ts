import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../lib/axios";
import getErrorMsg from "../lib/getErrorMsg";
import toast from "react-hot-toast";

export interface User {
  _id: string;
  username: string;
  fullname: string;
  email: string;
  displayName: string;
}

interface UserState {
  listUser: User[];
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  listUser: [],
  user: null,
  loading: false,
  error: null,
};

export const getListUser = createAsyncThunk<
  { message: string; users: User[] },
  void,
  { rejectValue: string }
>("user/list", async (_, thunkAPI) => {
  try {
    const res = await api.get("/user/list");
    return { message: res.data.message, users: res.data.users };
  } catch (err) {
    return thunkAPI.rejectWithValue(getErrorMsg(err, "Lấy danh sách người dùng thất bại"));
  }
});
export const updateProfile = createAsyncThunk<
  User,
  Partial<User>,
  { rejectValue: string }
>("user/updateProfile", async (data, thunkAPI) => {
  try {
    const res = await api.post("/user/update", data);
    toast.success("Cập nhật thông tin thành công");
    return res.data.user;
  } catch (err) {
    toast.error("Cập nhật thất bại");
    return thunkAPI.rejectWithValue(getErrorMsg(err, "Cập nhật thất bại"));
  }
});
export const deleteUser = createAsyncThunk<
  { message: string; userId: string },
  { userId: string },
  { rejectValue: string }
>("user/delete", async ({ userId }, thunkAPI) => {
  try {
    const res = await api.delete(`/user/delete/${userId}`);
    toast.success("Xóa người dùng thành công");
    return { message: res.data.message, userId };
  } catch (err) {
    toast.error("Xóa người dùng thất bại");
    return thunkAPI.rejectWithValue(getErrorMsg(err, "Xóa người dùng thất bại"));
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getListUser.fulfilled, (state, action) => {
        state.loading = false;
        state.listUser = action.payload.users;
      })
      .addCase(getListUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      });

    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.listUser = state.listUser.map((u) =>
          u._id === action.payload._id ? action.payload : u
        );
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Cập nhật thất bại";
      });
    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.listUser = state.listUser.filter(
          (u) => u._id !== action.payload.userId
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      });
  },
});

const userReducer = userSlice.reducer;
export default userReducer;
