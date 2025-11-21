import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const commentApi = createApi({
    reducerPath: 'commentApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['comment'],
    endpoints: (builder) => ({
        createComment: builder.mutation({
            query: (data) => ({
                url: '/comment/create',
                method: 'POST',
                body: data
            })
        }),
        deleteComment: builder.mutation({
            query: (commentId ) => ({
                url: '/comment/delete',
                method: 'POST',
                body: {commentId }
            })
        }),
    })
})

export const {
    useCreateCommentMutation,
    useDeleteCommentMutation
} = commentApi