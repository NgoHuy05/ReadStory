import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const historyApi = createApi({
    reducerPath: 'historyApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['history'],
    endpoints: (builder) => ({
        createHistory: builder.mutation({
            query: (data) => ({
                url: '/history/create',
                method: 'POST',
                body: data
            })
        }),
        deleteHistory: builder.mutation({
            query: (data) => ({
                url: '/history/delete',
                method: 'POST',
                body: data
            })
        }),
    })
})

export const {
    useCreateHistoryMutation,
    useDeleteHistoryMutation
} = historyApi