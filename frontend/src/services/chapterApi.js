import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const chapterApi = createApi({
    reducerPath: 'chapterApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['chapter'],
    endpoints: (builder) => ({
        getListChapterByStory: builder.query({ query: (slugStory) => `/chapter/${slugStory}` }),
        getDetailChapter: builder.query({ query: (slugChapter) => `/chapter/${slugChapter}` }),
        createChapter: builder.mutation({
            query: (data) => ({
                url: '/chapter/create',
                method: 'POST',
                body: data
            })
        }),
        deleteChapter: builder.mutation({
            query: (id) => ({
                url: '/chapter/delete',
                method: 'POST',
                body: { id }
            })
        })
    })
})

export const { useCreateChapterMutation, useDeleteChapterMutation, useGetDetailChapterQuery, useGetListChapterByStoryQuery } = chapterApi