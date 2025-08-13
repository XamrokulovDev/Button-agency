import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const _api = import.meta.env.VITE_API_URL;

export interface ProjectImage {
  uuid: string;
  image: string;
  order: number;
  project: string;
}

export interface ProjectServiceDetail {
  title_ru: string;
  title_uz: string;
  title_en: string;
}

export interface Project {
  uuid: string;
  service: string;
  service_details: ProjectServiceDetail[];
  title_ru: string;
  title_uz: string;
  title_en: string;
  description_ru: string;
  description_uz: string;
  description_en: string;
  image: string;
  image_2: string | null;
  image_3: string | null;
  url: string;
  order: number;
}

export interface ProjectDetailResponse {
  project: Project;
  next_project: Project;
}

interface ProjectDetailState {
  data: ProjectDetailResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProjectDetailState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchProjectDetail = createAsyncThunk(
  "projectDetail/fetchProjectDetail",
  async (uuid: string) => {
    const res = await axios.get(`${_api}/api/project-detail/${uuid}/`);
    return res.data as ProjectDetailResponse;
  }
);

const projectDetailSlice = createSlice({
  name: "projectDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProjectDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default projectDetailSlice.reducer;