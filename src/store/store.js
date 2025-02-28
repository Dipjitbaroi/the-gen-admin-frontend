import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import { configApi } from "../services/apiConfig";
// import { setupListeners } from "@reduxjs/toolkit/query";

export default configureStore({
  reducer: {
    counter: counterReducer,
    // Add the generated reducer as a specific top-level slice
    [configApi.reducerPath]: configApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(configApi.middleware),
});
// setupListeners(configureStore.dispatch);
