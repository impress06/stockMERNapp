import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.user = payload.user;
      state.token = payload.token;
    },
    registerSucess: (state, { payload }) => {
      state.loading = false;
      state.token = payload.token;
      state.user = payload.user;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    logoutSuccess: (state) => {
      state.user = null
        state.loading = false
        state.error = false
        state.token = null
    },
  },
});

export const { fetchFail, fetchStart, loginSuccess, registerSucess,logoutSuccess } =
  authSlice.actions;

export default authSlice.reducer;
