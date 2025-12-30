import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../lib/axios"
import getErrorMsg from "../lib/getErrorMsg"

interface Category {
  _id?: string
  name: string
  description: string
}

interface CategoryState {
  loading: boolean
  error: string | null
  listCategory: Category[]
  category: Category | null
}

const initialState: CategoryState = {
  loading: false,
  error: null,
  listCategory: [],
  category: null
}

export const getListCategory = createAsyncThunk<
  { message: string; category: Category[] },
  void,
  { rejectValue: string }
>("category/list", async (_, thunkAPI) => {
  try {
    const res = await api.get("/category/list")
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(
      getErrorMsg(err, "Lấy danh sách category thất bại")
    )
  }
})

export const createCategory = createAsyncThunk<
  { message: string; category: Category },
  { name: string; description: string },
  { rejectValue: string }
>("category/create", async (data, thunkAPI) => {
  try {
    const res = await api.post("/category/create", data)
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(
      getErrorMsg(err, "Tạo category thất bại")
    )
  }
})

export const updateCategory = createAsyncThunk<
  { message: string; category: Category },
  { id: string; name: string; description: string },
  { rejectValue: string }
>("category/update", async (data, thunkAPI) => {
  try {
    const res = await api.post(`/category/update/${data.id}`, data)
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(
      getErrorMsg(err, "Update category thất bại")
    )
  }
})

export const deleteCategory = createAsyncThunk<
  { message: string; id: string },
  { id: string },
  { rejectValue: string }
>("category/delete", async ({ id }, thunkAPI) => {
  try {
    const res = await api.delete(`/category/delete/${id}`)
    return { message: res.data.message, id }
  } catch (err) {
    return thunkAPI.rejectWithValue(
      getErrorMsg(err, "Xóa category thất bại")
    )
  }
})

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListCategory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getListCategory.fulfilled, (state, action) => {
        state.loading = false
        state.listCategory = action.payload.category
      })
      .addCase(getListCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? null
      })

      .addCase(createCategory.pending, (state) => {
        state.loading = true
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false
        state.listCategory.unshift(action.payload.category)
        state.category = action.payload.category
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? null
      })

      .addCase(updateCategory.pending, (state) => {
        state.loading = true
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false
        state.listCategory = state.listCategory.map((c) =>
          c._id === action.payload.category._id
            ? action.payload.category
            : c
        )
        state.category = action.payload.category
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? null
      })

      .addCase(deleteCategory.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false
        state.listCategory = state.listCategory.filter(
          (c) => c._id !== action.payload.id
        )
        state.category = null
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? null
      })
  }
})

const categoryReducer = categorySlice.reducer;
export default categoryReducer;