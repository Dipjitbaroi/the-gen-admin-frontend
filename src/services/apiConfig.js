import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const configApi = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token"); // Retrieve token from local storage
      if (token) {
        headers.set("Authorization", `Bearer ${token}`); // Set Authorization header
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `/auth/login`,
        method: "POST",
        body: data,
      }),
    }),
    getTransactions: builder.query({
      query: ({ page = 1, limit = 10, type }) =>
        `/transaction?page=${page}&limit=${limit}&type=${type}`,
    }),
    getSessions: builder.query({
      query: ({ page = 1, limit = 10, type }) =>
        `/sessions?page=${page}&limit=${limit}&type=${type}`,
    }),
    getUsers: builder.query({
      query: ({ page = 1, limit = 10, role }) =>
        `/user/admin?page=${page}&limit=${limit}&role=${role}`,
    }),
    getSupports: builder.query({
      query: ({ page = 1, limit = 10, status }) =>
        `/support?page=${page}&limit=${limit}&status=${status}`,
    }),
    getPost: builder.query({
      query: () => `/posts`,
    }),
    createPost: builder.mutation({
      query: (data) => ({
        url: `/posts`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const { useLoginMutation } = configApi;
export const { useGetTransactionsQuery } = configApi;
export const { useGetSessionsQuery } = configApi;
export const { useGetUsersQuery } = configApi;
export const { useGetSupportsQuery } = configApi;
export const { useGetPostQuery } = configApi;
export const { useCreatePostMutation } = configApi;
