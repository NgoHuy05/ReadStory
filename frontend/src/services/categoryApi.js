import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['category'],
    endpoints: (builder) => ({
        getListCategory: builder.query({query: () => '/category/list'}),
        createCategory: builder.mutation({
            query: (data) => ({
                url: '/category/create',
                method: 'POST',
                body: data
            })
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: '/category/delete',
                method: 'POST',
                body: {id}
            })
        }),
        updateCategory: builder.mutation({
            query: (data) => ({
                url: '/category/update',
                method: 'POST',
                body: data
            })
        })
    })
})

export const { useCreateCategoryMutation, useDeleteCategoryMutation, useGetListCategoryQuery, useUpdateCategoryMutation} = categoryApi