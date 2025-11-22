import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const commentApi = createApi({
    reducerPath: 'commentApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['comment'],
    endpoints: (builder) => ({
        getListCommentByChapter: builder.query({
            query: (chapterId) => ({
                url: `/comment/list/chapter/${chapterId}`,
                method: 'GET'
            })
        }),
        getListCommentByStory: builder.query({
            query: (storyId) => ({
                url: `/comment/list/story/${storyId}`,
                method: 'GET'
            })
        }),

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
    useGetListCommentByChapterQuery,
    useGetListCommentByStoryQuery,
    useCreateCommentMutation,
    useDeleteCommentMutation
} = commentApi