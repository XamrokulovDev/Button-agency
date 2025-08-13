import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const _api = import.meta.env.VITE_API_URL;

export interface ReviewItem {
  full_name_kr: string;
  full_name_lt: string;
  position_ru: string;
  position_uz: string;
  position_en: string;
  message_ru: string;
  message_uz: string;
  message_en: string;
  image: string;
  order: number;
}

interface ReviewState {
  data: ReviewItem[];
  loading: boolean;
  error: string | null;
}

const initialState: ReviewState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchReviews = createAsyncThunk(
  "review/fetchReviews",
  async () => {
    const res = await axios.get(`${_api}/api/review/`);
    return res.data;
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      });
  },
});

export default reviewSlice.reducer;