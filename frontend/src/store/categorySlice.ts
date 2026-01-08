import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../lib/axios"
import getErrorMsg from "../lib/getErrorMsg"
import toast from "react-hot-toast"
import { Status } from "./authSlice"

export interface Category {
  _id?: string
  name: string
  description: string
  slug: string
}

interface CategoryState {
  error: string | null
  listCategory: Category[]
  category: Category | null
  status: Status
}

const initialState: CategoryState = {
  error: null,
  listCategory: [],
  category: null,
  status: "idle"
}

export const getListCategory = createAsyncThunk<
  { message: string; category: Category[] },
  void,
  { rejectValue: string }
>("category/list", async (_, thunkAPI) => {
  try {
    const res = await api.get("/category/list")
    return { message: res.data.message, category: res.data.category }
  } catch (err) {
    return thunkAPI.rejectWithValue(getErrorMsg(err, "Lấy danh sách category thất bại"))
  }
})

export const createCategory = createAsyncThunk<
  { message: string; category: Category },
  { name: string; description: string },
  { rejectValue: string }
>("category/create", async (data, thunkAPI) => {
  try {
    const res = await api.post("/category/create", data)
    toast.success("Tạo category thành công")
    return res.data
  } catch (err) {
    toast.error("Tạo category thất bại")
    return thunkAPI.rejectWithValue(getErrorMsg(err, "Tạo category thất bại"))
  }
})

export const updateCategory = createAsyncThunk<
  { message: string; category: Category },
  { id: string; name: string; description: string },
  { rejectValue: string }
>("category/update", async (data, thunkAPI) => {
  try {
    const res = await api.post(`/category/update/${data.id}`, data)
    toast.success("Cập nhật category thành công")
    return res.data
  } catch (err) {
    toast.error("Update category thất bại")
    return thunkAPI.rejectWithValue(getErrorMsg(err, "Update category thất bại"))
  }
})

export const deleteCategory = createAsyncThunk<
  { message: string; id: string },
  { id: string },
  { rejectValue: string }
>("category/delete", async ({ id }, thunkAPI) => {
  try {
    const res = await api.delete(`/category/delete/${id}`)
    toast.success("Xóa category thành công")
    return { message: res.data.message, id }
  } catch (err) {
    toast.error("Xóa category thất bại")
    return thunkAPI.rejectWithValue(getErrorMsg(err, "Xóa category thất bại"))
  }
})

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListCategory.pending, (state) => {
        state.status= "loading"
        state.error = null
      })
      .addCase(getListCategory.fulfilled, (state, action) => {
        state.status = "success"
        state.listCategory = action.payload.category
      })
      .addCase(getListCategory.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload ?? null
      })

      .addCase(createCategory.pending, (state) => {
        state.status= "loading"

      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.status = "success"
        state.listCategory.unshift(action.payload.category)
        state.category = action.payload.category
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload ?? null
      })

      .addCase(updateCategory.pending, (state) => {
        state.status= "loading"

      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.status = "success"
        state.listCategory = state.listCategory.map((c) =>
          c._id === action.payload.category._id
            ? action.payload.category
            : c
        )
        state.category = action.payload.category
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload ?? null
      })

      .addCase(deleteCategory.pending, (state) => {
        state.status= "loading"

      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = "success"
        state.listCategory = state.listCategory.filter(
          (c) => c._id !== action.payload.id
        )
        state.category = null
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload ?? null
      })
  }
})

const categoryReducer = categorySlice.reducer;
export default categoryReducer;