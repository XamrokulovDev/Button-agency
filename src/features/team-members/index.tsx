import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

const _api = import.meta.env.VITE_API_URL

interface TeamMember {
  full_name_kr: string
  full_name_lt: string
  position_ru: string
  position_uz: string
  position_en: string
  photo: string
  order: number
}

interface TeamState {
  data: TeamMember[]
  loading: boolean
  error: string | null
}

const initialState: TeamState = {
  data: [],
  loading: false,
  error: null,
}

export const fetchTeam = createAsyncThunk(
  'team/fetch',
  async () => {
    const response = await axios.get<TeamMember[]>(`${_api}/api/team-members/`)
    return response.data
  }
)

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeam.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTeam.fulfilled, (state, action: PayloadAction<TeamMember[]>) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchTeam.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Xatolik'
      })
  },
})

export default teamSlice.reducer