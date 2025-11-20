import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logOut, setCredentials } from '../redux/slice/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5555',
  credentials: 'include', 
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    try {
      const refreshResult = await baseQuery(
        { url: '/auth/refresh-token', method: 'POST' },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        api.dispatch(setCredentials({ accessToken: refreshResult.data.accessToken }));
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logOut());
      }
    } catch {
      api.dispatch(logOut());
    }
  }

  return result;
};
