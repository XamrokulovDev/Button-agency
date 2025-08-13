import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
const _api = import.meta.env.VITE_API_URL;

interface WorkProcessItem {
  title_ru: string
  title_en: string
  title_uz: string
  description_ru: string
  description_en: string
  description_uz: string
  image: string
  order: number
}

interface CronologyState {
  data: WorkProcessItem[]
  loading: boolean
  error: string | null
}

const initialState: CronologyState = {
  data: [],
  loading: false,
  error: null,
}

export const fetchCronology = createAsyncThunk(
  'cronology/fetch',
  async () => {
    const res = await fetch(`${_api}/api/work-process/`)
    const data = await res.json();
    return data
  }
)

const cronologySlice = createSlice({
  name: 'cronology',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCronology.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCronology.fulfilled, (state, action: PayloadAction<WorkProcessItem[]>) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchCronology.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Xatolik'
      })
  },
})

export default cronologySlice.reducer