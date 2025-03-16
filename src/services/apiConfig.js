import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const configApi = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}`,
    prepareHeaders: (headers) => {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token"); // Retrieve token from local storage
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
      query: ({ page = 1, limit = 10, type = "", sort = "asc", search }) =>
        `/transaction?page=${page}&limit=${limit}&type=${type}&sort=${sort}&search=${search}`,
    }),
    createRefund: builder.mutation({
      query: ({ id, reason, amount }) => ({
        url: `/transaction/refund/${id}`, // Inject ID dynamically
        method: "POST",
        body: { reason, amount }, // Send body with reason and amount
      }),
    }),
    getSessions: builder.query({
      query: ({ page = 1, limit = 10, type, search }) =>
        `/sessions?page=${page}&limit=${limit}&type=${type}&search=${search}`,
    }),
    getSessionsById: builder.query({
      query: ({ id }) => `/sessions/${id}`,
    }),
    getValidToken: builder.query({
      query: ({ id }) => `/auth/validate-token/${id}`,
    }),
    getUserImage: builder.query({
      query: ({ id }) => `/user/${id}/images`,
    }),
    getUsers: builder.query({
      query: ({ page = 1, limit = 10, type, search }) =>
        `/user?page=${page}&limit=${limit}&type=${type}&search=${search}`,
    }),
    getSupports: builder.query({
      query: ({ page = 1, limit = 10, status, search }) =>
        `/support?page=${page}&limit=${limit}&status=${status}&search=${search}`,
    }),
    getNumOfUsers: builder.query({
      query: ({ type = "month", year, month }) =>
        `/analytics/number-of-users?type=${type}&year=${year}&month=${month}`,
    }),
    getRealTimeMixerUsers: builder.query({
      query: ({ type = "month", year, month }) =>
        `/analytics/real-time-mixer-users?type=${type}&year=${year}&month=${month}`,
    }),
    getRealTimeActiveUsers: builder.query({
      query: ({ type = "month", year, month }) =>
        `/analytics/real-time-active-users?type=${type}&year=${year}&month=${month}`,
    }),
    getSessionBooked: builder.query({
      query: ({ type = "month", year, month }) =>
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
    getGeoData: builder.query({
      query: ({ page = 1, limit = 10 }) =>
        `/analytics/country-language?page=${page}&limit=${limit}`,
    }),
    getNewUsers: builder.query({
      query: () => `/analytics/new-users`,
    }),
    getAllNewUsers: builder.query({
      query: ({ page = 1, limit = 10 }) =>
        `/analytics/all-new-users?page=${page}&limit=${limit}`,
    }),
    getSubscriptions: builder.query({
      query: () => `/subscriptions`,
    }),
    getRevenue: builder.query({
      query: ({ year, month }) =>
        `/analytics/revenue?year=${year}&month=${month}`,
    }),
    getTopPro: builder.query({
      query: ({ type = "month", year, month }) =>
        `/analytics/top-pros?type=${type}&year=${year}&month=${month}`,
    }),
    getTopPeer: builder.query({
      query: ({ type = "month", year, month }) =>
        `/analytics/top-peers?type=${type}&year=${year}&month=${month}`,
    }),
    getUnlimitedSubEarnings: builder.query({
      query: ({ planId = "6798ca758eb52d26697acaf2", year, month }) =>
        `/analytics/revenue?planId=${planId}&year=${year}&month=${month}`,
    }),
    getProSubEarnings: builder.query({
      query: ({ planId = "6798caba8eb52d26697acaf4", year, month }) =>
        `/analytics/revenue?planId=${planId}&year=${year}&month=${month}`,
    }),
    getRole: builder.query({
      query: () => `/roles`,
    }),
    updateRole: builder.mutation({
      query: ({ id, updateData }) => ({
        url: `/roles/${id}`,
        method: "PATCH",
        body: updateData,
      }),
    }),
    createRole: builder.mutation({
      query: ({ body }) => ({
        url: `/roles/create`,
        method: "POST",
        body: body,
      }),
    }),
    getPermission: builder.query({
      query: () => `/roles/permissions`,
    }),
    getProfile: builder.query({
      query: () => `/auth/me`,
    }),
    updateSubscription: builder.mutation({
      query: ({ id, updateData }) => ({
        url: `/subscriptions/plan/${id}`,
        method: "PATCH",
        body: updateData,
      }),
    }),

    updateBooking: builder.mutation({
      query: (id, updateData) => ({
        url: `/sessions/${id}`,
        method: "PATCH",
        body: updateData,
      }),
    }),
    updateAdminInfo: builder.mutation({
      query: ({ id, updateData }) => ({
        url: `/user/admin/${id}`,
        method: "PATCH",
        body: updateData,
      }),
    }),
    createAdmin: builder.mutation({
      query: ({ body }) => ({
        url: `/auth/create-admin`,
        method: "POST",
        body: body,
      }),
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
    }),
    banUser: builder.mutation({
      query: ({ id, banType }) => ({
        url: `/user/${id}/ban`,
        method: "PATCH",
        body: { banType },
      }),
    }),
    inviteUser: builder.mutation({
      query: ({ email }) => ({
        url: `/user/invite`, // Inject ID dynamically
        method: "POST",
        body: { email }, // Send body with reason and amount
      }),
    }),
    forgotPassword: builder.mutation({
      query: ({ email }) => ({
        url: `/auth/forget-password`, // Inject ID dynamically
        method: "POST",
        body: { email }, // Send body with reason and amount
      }),
    }),
    setAdminPassword: builder.mutation({
      query: ({ password, token }) => ({
        url: `/auth/set-password`, // Inject ID dynamically
        method: "POST",
        body: { token, password }, // Send body with reason and amount
      }),
    }),
    findProOnThatTime: builder.query({
      query: ({ page = 1, limit = 10, search, date, startTime, endTime }) =>
        `/sessions/findpros?date=${date}&startTime=${startTime}&endTime=${endTime}&search=${search}&page=${page}&limit=${limit}`,
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
export const { useCreateRefundMutation } = configApi;
export const { useGetSessionsQuery } = configApi;
export const { useGetValidTokenQuery } = configApi;
export const { useGetSessionsByIdQuery } = configApi;
export const { useGetUserImageQuery } = configApi;
export const { useGetUsersQuery } = configApi;
export const { useGetSupportsQuery } = configApi;
export const { useGetNumOfUsersQuery } = configApi;
export const { useGetRealTimeMixerUsersQuery } = configApi;
export const { useGetRealTimeActiveUsersQuery } = configApi;
export const { useGetSessionBookedQuery } = configApi;
export const { useGetAgeGroupQuery } = configApi;
export const { useGetGenderQuery } = configApi;
export const { useGetGeoDataQuery } = configApi;
export const { useGetRevenueQuery } = configApi;
export const { useGetSubscriptionsQuery } = configApi;
export const { useGetTopPeerQuery } = configApi;
export const { useGetTopProQuery } = configApi;
export const { useGetUnlimitedSubEarningsQuery } = configApi;
export const { useGetProSubEarningsQuery } = configApi;
export const { useGetNewUsersQuery } = configApi;
export const { useGetAllNewUsersQuery } = configApi;
export const { useUpdateSubscriptionMutation } = configApi;
export const { useUpdateBookingMutation } = configApi;
export const { useUpdateAdminInfoMutation } = configApi;
export const { useCreateAdminMutation } = configApi;
export const { useUpdateRoleMutation } = configApi;
export const { useCreateRoleMutation } = configApi;
export const { useFindProOnThatTimeQuery } = configApi;
export const { useGetRoleQuery } = configApi;
export const { useGetPermissionQuery } = configApi;
export const { useGetProfileQuery } = configApi;
export const { useLazyGetProfileQuery } = configApi;
export const { useDeleteUserMutation } = configApi;
export const { useInviteUserMutation } = configApi;
export const { useForgotPasswordMutation } = configApi;
export const { useSetAdminPasswordMutation } = configApi;
export const { useBanUserMutation } = configApi;
export const { useGetPostQuery } = configApi;
export const { useCreatePostMutation } = configApi;
