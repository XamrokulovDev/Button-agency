import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const _api = import.meta.env.VITE_API_URL;

interface Partner {
  id: number;
  url: string;
  logo: string;
}

interface PartnersState {
  data: Partner[];
  loading: boolean;
  error: string | null;
}

const initialState: PartnersState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchPartners = createAsyncThunk(
  "partners/fetchPartners",
  async () => {
    const res = await axios.get(`${_api}/api/partners/`);
    return res.data;
  }
);

const partnersSlice = createSlice({
  name: "partners",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPartners.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPartners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default partnersSlice.reducer;