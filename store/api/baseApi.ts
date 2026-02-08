import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      // Add auth token or other headers here
      // const token = getToken();
      // if (token) {
      //   headers.set('Authorization', `Bearer ${token}`);
      // }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['User', 'Post'],
  endpoints: () => ({}),
});
