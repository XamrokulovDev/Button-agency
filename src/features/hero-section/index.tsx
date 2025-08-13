import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
const _api = import.meta.env.VITE_API_URL;

interface HeroData {
  title_ru: string
  title_en: string
  title_uz: string
  subtitle_ru: string
  subtitle_en: string
  subtitle_uz: string
  video: string
}

interface HeroState {
  data: HeroData | null
  loading: boolean
  error: string | null
}

const initialState: HeroState = {
  data: null,
  loading: false,
  error: null,
}

export const fetchHero = createAsyncThunk('hero/fetch', async () => {
  const res = await fetch(`${_api}/api/hero-section/`)
  const data = await res.json()
  return data
})

const heroSlice = createSlice({
  name: 'hero',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHero.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchHero.fulfilled, (state, action: PayloadAction<HeroData>) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchHero.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Error'
      })
  },
})

export default heroSlice.reducer