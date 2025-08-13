import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const _api = import.meta.env.VITE_API_URL;

interface Statistic {
  amount: string;
  title_uz: string;
  title_ru: string;
  title_en: string;
  order: number;
}

interface StatisticsState {
  data: Statistic[];
  loading: boolean;
  error: string | null;
}

const initialState: StatisticsState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchStatistics = createAsyncThunk<Statistic[]>(
  "statistics/fetch",
  async () => {
    const response = await axios.get(`${_api}/api/statistics/`);
    return response.data;
  }
);

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatistics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      });
  },
});

export default statisticsSlice.reducer;