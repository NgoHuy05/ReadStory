import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const storyApi = createApi({
    reducerPath: 'storyApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['storyApi'],
    endpoints: (builder) => ({
        getListStory: builder.query({ query: () => '/story/list' }),
        getDetailStory: builder.query({
            query: (slug) => `/story/${slug}`,
        }),
        createStory: builder.mutation({
            query: (data) => ({
                url: '/story/create',
                method: 'POST',
                body: data
            })
        }),
        deleteStory: builder.mutation({
            query: (id) => ({
                url: '/story/delete',
                method: 'POST',
                body: {id}
            })
        }),
    })
})

export const {
    useGetListStoryQuery,
    useGetDetailStoryQuery,
    useCreateStoryMutation,
    useDeleteStoryMutation
} = storyApi