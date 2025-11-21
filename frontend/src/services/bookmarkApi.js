import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const bookmarkApi = createApi({
    reducerPath: 'bookmarkApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['bookmark'],
    endpoints: (builder) => ({
        createBookmark: builder.mutation({
            query: (data) => ({
                url: '/bookmark/create',
                method: 'POST',
                body: data
            })
        }),
        deleteBookmark: builder.mutation({
            query: (id) => ({
                url: '/bookmark/delete',
                method: 'POST',
                body: {id}
            })
        }),
    })
})

export const {
    useCreateBookmarkMutation,
    useDeleteBookmarkMutation
} = bookmarkApi