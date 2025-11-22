import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getProfile: builder.query({ query: () => '/user/me' }),
        getListUser: builder.query({ query: () => '/user/list' }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: '/user/update',
                method: 'POST',
                body: data,
            }),
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: '/user/delete',
                method: 'POST',
                body: { userId },
            })
        }),
    }),
});

export const {
    useGetProfileQuery,
    useGetListUserQuery,
    useUpdateProfileMutation,
    useDeleteUserMutation,
} = userApi