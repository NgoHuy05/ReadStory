import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import { authApi } from "../services/authApi";
import userReducer from "./slice/userSlice";
import { userApi } from "../services/userApi";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        user: userReducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(userApi.middleware)
    
})