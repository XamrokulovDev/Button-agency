import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const _api = import.meta.env.VITE_API_URL;

interface CompanyInfoData {
  title_ru: string;
  title_uz: string;
  title_en: string;
  description_ru: string;
  description_uz: string;
  description_en: string;
  mission_ru: string;
  mission_uz: string;
  mission_en: string;
  image: string;
}

interface CompanyInfoState {
  info: CompanyInfoData | null;
  loading: boolean;
  error: string | null;
}

const initialState: CompanyInfoState = {
  info: null,
  loading: false,
  error: null,
};

export const fetchCompanyInfo = createAsyncThunk(
  "companyInfo/fetchCompanyInfo",
  async () => {
    const res = await axios.get(`${_api}/api/company-info/`);
    return res.data;
  }
);

const companyInfoSlice = createSlice({
  name: "companyInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCompanyInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload;
      })
      .addCase(fetchCompanyInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      });
  },
});

export default companyInfoSlice.reducer;