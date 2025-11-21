import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import { authApi } from "../services/authApi";
import userReducer from "./slice/userSlice";
import { userApi } from "../services/userApi";
import storyReducer from "./slice/storySlice";
import { storyApi } from "../services/storyApi";
import chapterReducer from "./slice/chapterSlice";
import { chapterApi } from "../services/chapterApi";
import categoryReducer from "./slice/categorySlice";
import { categoryApi } from "../services/categoryApi";
import storyCategoryReducer from "./slice/storyCategorySlice";
import { storyCategoryApi } from "../services/storyCategoryApi";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        user: userReducer,
        [userApi.reducerPath]: userApi.reducer,
        story: storyReducer,
        [storyApi.reducerPath]: storyApi.reducer,
        chapter: chapterReducer,
        [chapterApi.reducerPath]: chapterApi.reducer,
        category: categoryReducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        storyCategory: storyCategoryReducer,
        [storyCategoryApi.reducerPath]: storyCategoryApi.reducer,

    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(userApi.middleware)
            .concat(storyApi.middleware)
            .concat(chapterApi.middleware)
            .concat(categoryApi.middleware)
    
})