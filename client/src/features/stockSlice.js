import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firm: [],
  sale: [],
  purchase: [],
  brand: [],
  category:[],
  product: [],
  error: false,
  loading: false,
  paginationInfo: {
    filter: {},
    search: [],
    sort: {},
    skip: 0,
    limit: 9,
    page: 0,
    pages: {
      previous: false,
      current: 1,
      next: 2,
      total: 1,
    },
    totalRecords: 0,
  },
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchStockSuccess: (state, { payload }) => {
      state[payload.url] = payload.ApiData;
      state.paginationInfo = payload.ApiPegination;
      state.loading = false;
    },
    setCurrentPage: (state, { payload }) => {
      state.paginationInfo.page = payload;
    },

    fetchFail: (state) => {
      state.error = true;
    },
  },
});

export const { fetchFail, fetchStart, fetchStockSuccess, setCurrentPage } =
  stockSlice.actions;
export default stockSlice.reducer;
