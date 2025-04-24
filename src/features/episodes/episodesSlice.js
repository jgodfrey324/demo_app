import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Define an async thunk to fetch episodes
export const fetchEpisodes = createAsyncThunk(
  'episodes/fetchEpisodes', 
  async () => {
    const response = await fetch('https://rickandmortyapi.com/api/episode')
    const data = await response.json()
    return data.results
  }
)

const episodesSlice = createSlice({
  name: 'episodes',
  initialState: {
    list: [],
    status: 'idle',  // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEpisodes.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchEpisodes.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.list = action.payload
      })
      .addCase(fetchEpisodes.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default episodesSlice.reducer
