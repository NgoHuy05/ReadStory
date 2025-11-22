import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['comment'],
  endpoints: (builder) => ({
    getListCommentByChapter: builder.query({
      query: (slugChapter) => ({
        url: `/comment/list/chapter/${slugChapter}`,
        method: 'GET'
      })
    }),
    getListCommentByStory: builder.query({
      query: (slugStory) => ({
        url: `/comment/list/story/${slugStory}`,
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
      query: (commentId) => ({
        url: '/comment/delete',
        method: 'POST',
        body: { commentId }
      })
    }),
  })
})

export const {
  useGetListCommentByChapterQuery,
  useGetListCommentByStoryQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation
} = commentApi;
