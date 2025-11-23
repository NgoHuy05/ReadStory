import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const storyCategoryApi = createApi({
    reducerPath: 'storyCategoryApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['storyCategory'],
    endpoints: (builder) => ({
        getListStoryCategory: builder.query({
            query: () => ({
                url: '/storyCategory/list',
                method: 'GET'
            }),
        }),
        createStoryCategory: builder.mutation({
            query: (data) => ({
                url: '/storyCategory/create',
                method: 'POST',
                body: data
            })
        }),
        deleteStoryCategory: builder.mutation({
            query: (data) => ({
                url: '/storyCategory/delete',
                method: 'POST',
                body: data
            })
        })

    })
})

export const {
    useCreateStoryCategoryMutation,
    useDeleteStoryCategoryMutation
} = storyCategoryApi