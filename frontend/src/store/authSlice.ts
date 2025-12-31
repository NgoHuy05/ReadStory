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

export interface AuthState {
  accessToken?: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
  loading: false,
  error: null,
  initialized: false,
};

export const login = createAsyncThunk<
  { message: string; user: User; accessToken: string },
  { username: string; password: string },
  { rejectValue: string }
>("auth/Login", async (data, thunkAPI) => {
  try {
    const res = await api.post("/auth/login", data);
    return {
      message: res.data.message,
      user: res.data.user,
      accessToken: res.data.accessToken,
    };
  } catch (err) {
    return thunkAPI.rejectWithValue(getErrorMsg(err, "Đăng nhập thất bại"));
  }
});

export const register = createAsyncThunk<
  { message: string },
  {
    username: string;
    fullname: string;
    email: string;
    password: string;
    repassword: string;
  },
  { rejectValue: string }
>("auth/Register", async (data, thunkAPI) => {
  try {
    const res = await api.post("/auth/register", data);
    return { message: res.data.message };
  } catch (err) {
    return thunkAPI.rejectWithValue(getErrorMsg(err, "Đăng ký thất bại"));
  }
});

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/Logout",
  async (_, thunkAPI) => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      return thunkAPI.rejectWithValue(getErrorMsg(err, "Đăng xuất thất bại"));
    }
  }
);

export const refreshToken = createAsyncThunk<
  { message: string; accessToken: string },
  void,
  { rejectValue: string }
>("auth/refreshToken", async (_, thunkAPI) => {
  try {
    const res = await api.post("/auth/refreshtoken");
    return { message: res.data.message, accessToken: res.data.accessToken };
  } catch (err) {
    return thunkAPI.rejectWithValue(getErrorMsg(err, "Làm mới token thất bại"));
  }
});

export const getProfile = createAsyncThunk<User, void, { rejectValue: string }>(
  "auth/getProfile",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/auth/me");
      return res.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(getErrorMsg(err, "Chưa đăng nhập"));
    }
  }
);

export const loadAuth = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/loadAuth",
  async (_, thunkAPI) => {
    try {
      await thunkAPI.dispatch(refreshToken()).unwrap();
      await thunkAPI.dispatch(getProfile()).unwrap();
    } catch (err) {
      return thunkAPI.rejectWithValue(getErrorMsg(err, "Khởi tạo auth thất bại"));
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      });

    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      });

    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.accessToken = null;
      state.error = null;
      state.loading = false;
      state.initialized = true;
    });

    builder
      .addCase(refreshToken.pending, (state) => {
        state.loading = false;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.loading = false;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.accessToken = null;
        state.user = null;
        state.loading = false;
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
        state.accessToken = null;
      });
    builder
      .addCase(loadAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadAuth.fulfilled, (state) => {
        state.loading = false;
        state.initialized = true;
      })
      .addCase(loadAuth.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.accessToken = null;
        state.initialized = true;
      });
  },
});

const authReducer = authSlice.reducer;
export default authReducer;
