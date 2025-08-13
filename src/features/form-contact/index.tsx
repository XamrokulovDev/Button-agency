import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const _api = import.meta.env.VITE_API_URL;
import i18n from "../../i18n";

interface FormState {
  status: "idle" | "loading" | "success" | "error" | "warning";
  message: string | null;
}

const initialState: FormState = {
  status: "idle",
  message: null,
};

export const submitForm = createAsyncThunk(
  "form/submitForm",
  async (
    formData: { name: string; phone: string; subject: string },
    { rejectWithValue }
  ) => {
    try {
      const { name, phone, subject } = formData;

      if (!name || !phone || !subject) {
        return rejectWithValue(i18n.t("modal_form.warning"));
      }

      await axios.post(`${_api}/api/contact-request/`, {
        name,
        phone,
        subject,
      });
      return i18n.t("modal_form.success");
    } catch (error) {
      return rejectWithValue(i18n.t("modal_form.error") + error);
    }
  }
);

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitForm.pending, (state) => {
        state.status = "loading";
        state.message = null;
      })
      .addCase(submitForm.fulfilled, (state, action) => {
        state.status = "success";
        state.message = action.payload as string;
      })
      .addCase(submitForm.rejected, (state, action) => {
        const msg = action.payload as string;
        state.status = msg.includes("maydon") ? "warning" : "error";
        state.message = msg;
      });
  },
});

export const { clearMessage } = formSlice.actions;
export default formSlice.reducer;