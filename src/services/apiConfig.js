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
      query: ({ page = 1, limit = 10, type = "", sort = "asc" }) =>
        `/transaction?page=${page}&limit=${limit}&type=${type}&sort=${sort}`,
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
    getNumOfUsers: builder.query({
      query: ({ type = "month", year = 2025, month = 1 }) =>
        `/analytics/number-of-users?type=${type}&year=${year}&month=${month}`,
    }),
    getRealTimeMixerUsers: builder.query({
      query: ({ type = "month", year = 2025, month = 1 }) =>
        `/analytics/real-time-mixer-users?type=${type}&year=${year}&month=${month}`,
    }),
    getRealTimeActiveUsers: builder.query({
      query: ({ type = "month", year = 2025, month = 1 }) =>
        `/analytics/real-time-active-users?type=${type}&year=${year}&month=${month}`,
    }),
    getSessionBooked: builder.query({
      query: ({ type = "month", year = 2025, month = 1 }) =>
        `/analytics/sessions-booked?type=${type}&year=${year}&month=${month}`,
    }),
    getAgeGroup: builder.query({
      query: ({ type = "month", year, month }) =>
        `/analytics/age-group?type=${type}&year=${year}&month=${month}`,
    }),
    getGender: builder.query({
      query: ({ type = "month", year, month }) =>
        `/analytics/gender?type=${type}&year=${year}&month=${month}`,
    }),
    getNewUsers: builder.query({
      query: () => `/analytics/new-users`,
    }),
    getAllNewUsers: builder.query({
      query: ({ page = 1, limit = 10, status }) =>
        `/analytics/all-new-users?page=${page}&limit=${limit}&status=${status}`,
    }),
    getRevenue: builder.query({
      query: ({ year, month }) =>
        `/analytics/revenue?year=${year}&month=${month}`,
    }),
    getUnlimitedSubEarnings: builder.query({
      query: ({ planId = "6798ca758eb52d26697acaf2", year, month }) =>
        `/analytics/revenue?planId=${planId}&year=${year}&month=${month}`,
    }),
    getProSubEarnings: builder.query({
      query: ({ planId = "6798caba8eb52d26697acaf4", year, month }) =>
        `/analytics/revenue?planId=${planId}&year=${year}&month=${month}`,
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
export const { useGetNumOfUsersQuery } = configApi;
export const { useGetRealTimeMixerUsersQuery } = configApi;
export const { useGetRealTimeActiveUsersQuery } = configApi;
export const { useGetSessionBookedQuery } = configApi;
export const { useGetAgeGroupQuery } = configApi;
export const { useGetGenderQuery } = configApi;
export const { useGetRevenueQuery } = configApi;
export const { useGetUnlimitedSubEarningsQuery } = configApi;
export const { useGetProSubEarningsQuery } = configApi;
export const { useGetNewUsersQuery } = configApi;
export const { useGetAllNewUsersQuery } = configApi;
export const { useGetPostQuery } = configApi;
export const { useCreatePostMutation } = configApi;
