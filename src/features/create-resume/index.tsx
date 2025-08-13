import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import i18n from '../../i18n';
const _api = import.meta.env.VITE_API_URL;

export interface ResumeFormData {
  name: string;
  phone: string;
  message: string;
  file: File | null;
}

interface ResumeState {
  status: 'idle' | 'loading' | 'success' | 'error' | 'warning';
  message: string | null;
}

const initialState: ResumeState = {
  status: 'idle',
  message: null,
};

export const submitResume = createAsyncThunk<
  string,
  ResumeFormData,
  { rejectValue: string }
>(
  'resume/submitResume',
  async (formData, { rejectWithValue }) => {
    const { name, phone, message, file } = formData;

    if (!name || !phone || !message || !file) {
      return rejectWithValue(i18n.t("modal_form.warning"));
    }

    const data = new FormData();
    data.append('name', name);
    data.append('phone', phone);
    data.append('message', message);
    data.append('file', file);
    data.append('captcha', '6Lck5aMrAAAAAJkw2fax5Tft_JzCeK59qd3BP3vW');

    try {
      await axios.post(`${_api}/api/resume-create/`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return i18n.t("modal_form.success");
    } catch (error) {
      return rejectWithValue(i18n.t("modal_form.error") + error);
    }
  }
);

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    clearResumeMessage: (state) => {
      state.status = 'idle';
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitResume.pending, (state) => {
        state.status = 'loading';
        state.message = null;
      })
      .addCase(submitResume.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'success';
        state.message = action.payload;
      })
      .addCase(submitResume.rejected, (state, action) => {
        const msg = action.payload;

        if (typeof msg === 'string') {
          state.status = msg.includes('maydon') ? 'warning' : 'error';
          state.message = msg;
        } else {
          state.status = 'error';
          state.message = 'Nomaʼlum xatolik yuz berdi';
        }
      });
  },
});

export const { clearResumeMessage } = resumeSlice.actions;
export default resumeSlice.reducer;