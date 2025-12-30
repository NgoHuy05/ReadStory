import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../lib/axios";
import getErrorMsg from "../lib/getErrorMsg";

export interface User {
  _id: string;
  username: string;
  fullname: string;
  email: string;
  displayName: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const signIn = createAsyncThunk<
  { message: string; user: User },
  { username: string; password: string },
  { rejectValue: string }
>("auth/signIn", async (data, thunkAPI) => {
  try {
    const res = await api.post("/auth/login", data);
    return { message: res.data.message, user: res.data.user };
  } catch (err) {
    return thunkAPI.rejectWithValue(
      getErrorMsg(err, "Đăng nhập thất bại")
    );
  }
});

export const signUp = createAsyncThunk<
  { message: string },
  {
    username: string;
    fullname: string;
    email: string;
    password: string;
    repassword: string;
  },
  { rejectValue: string }
>("auth/signUp", async (data, thunkAPI) => {
  try {
    const res = await api.post("/auth/register", data);
    return { message: res.data.message };
  } catch (err) {
    return thunkAPI.rejectWithValue(
      getErrorMsg(err, "Đăng ký thất bại")
    );
  }
});

export const signOut = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("auth/signOut", async (_, thunkAPI) => {
  try {
    await api.post("/auth/logout");
  } catch (err) {
    return thunkAPI.rejectWithValue(
      getErrorMsg(err, "Đăng xuất thất bại")
    );
  }
});


export const getProfile = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("auth/getProfile", async (_, thunkAPI) => {
  try {
    const res = await api.get("/auth/me");
    return res.data.user;
  } catch (err) {
    return thunkAPI.rejectWithValue(
      getErrorMsg(err, "Chưa đăng nhập")
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      });

    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      });

    /* ---------- SIGN OUT ---------- */
    builder.addCase(signOut.fulfilled, (state) => {
      state.user = null;
    });

    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getProfile.rejected, (state) => {
        state.loading = false;
        state.user = null;
      });
  },
});

const authReducer = authSlice.reducer;
export default authReducer;
