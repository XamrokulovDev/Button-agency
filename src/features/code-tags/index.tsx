import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const _api = import.meta.env.VITE_API_URL;

export interface CodeTag {
  tag: string;
  code: string;
  order: number;
}

interface CodeTagsState {
  data: CodeTag[];
  loading: boolean;
  error: string | null;
}

const initialState: CodeTagsState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchCodeTags = createAsyncThunk(
  "codeTags/fetchCodeTags",
  async () => {
    const response = await axios.get<CodeTag[]>(`${_api}/api/code-tags/`);
    return response.data;
  }
);

const codeTagsSlice = createSlice({
  name: "codeTags",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCodeTags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCodeTags.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCodeTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      });
  },
});

export default codeTagsSlice.reducer;