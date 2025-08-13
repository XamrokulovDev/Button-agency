import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const _api = import.meta.env.VITE_API_URL;

interface ContactData {
  title_ru: string;
  title_uz: string;
  title_en: string;
  address_ru: string;
  address_uz: string;
  address_en: string;
  phone_main: string;
  phone_additional: string | null;
  email_main: string;
  email_support: string | null;
  telegram: string;
  instagram: string;
  linkedin: string;
  facebook: string;
  youtube: string;
  map_embed_code: string;
}

interface ContactState {
  data: ContactData | null;
  loading: boolean;
  error: string | null;
}

const initialState: ContactState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchContact = createAsyncThunk(
  "contact/fetchContact",
  async () => {
    const res = await axios.get(`${_api}/api/contact-info/`);
    return res.data;
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContact.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      });
  },
});

export default contactSlice.reducer;