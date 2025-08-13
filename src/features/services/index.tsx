import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const _api = import.meta.env.VITE_API_URL;

interface ServiceDetail {
  title_uz: string;
  title_ru: string;
  title_en: string;
}

interface Service {
  uuid: string;
  title_uz: string;
  title_ru: string;
  title_en: string;
  image: string;
  order: number;
  details: ServiceDetail[];
}

interface ServicesState {
  data: Service[];
  loading: boolean;
  error: string | null;
}

const initialState: ServicesState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchServices = createAsyncThunk<Service[]>(
  "services/fetch",
  async () => {
    const response = await axios.get(`${_api}/api/services/`);
    return response.data;
  }
);

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      });
  },
});

export default servicesSlice.reducer;