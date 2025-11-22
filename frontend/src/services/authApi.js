import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5555/auth',
        credentials: 'include'
    }),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (data) => ({
                url: '/sign-up',
                method: 'POST',
                body: data
            })
        }),
        signIn: builder.mutation({
            query: (data) => ({
                url: '/sign-in',
                method: 'POST',
                body: data
            })
        }),
        signOut: builder.mutation({
            query: () => ({
                url: '/sign-out',
                method: 'POST'
            })
        }),
        refreshToken: builder.mutation({
            query: () => ({
                url: '/refresh-token',
                method: 'POST'
            })
        }),
    })
})

export const {
    useSignUpMutation,
    useSignInMutation,
    useSignOutMutation,
    useRefreshTokenMutation
} = authApi