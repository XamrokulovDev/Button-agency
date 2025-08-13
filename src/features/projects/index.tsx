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
  images: ProjectImage[];
  service: string;
  service_details: ProjectServiceDetail[];
  title_ru: string;
  title_uz: string;
  title_en: string;
  description_ru: string;
  description_uz: string;
  description_en: string;
  image: string;
  url: string;
  order: number;
}

export interface ProjectDetailResponse {
  project: Project;
  next_project: Project;
}

interface ProjectState {
  data: Project[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    const res = await axios.get(`${_api}/api/projects/`);
    return res.data;
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default projectsSlice.reducer;