import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

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
    episodes: {},
    ids: [],
    status: 'idle',  // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
     // HYDRATE must come first
     builder
        .addCase(HYDRATE, (state, action) => {
            return {
                ...state,
                ...action.payload.episodes,
                episodes: {
                    ...state.episodes,
                    ...action.payload.episodes.episodes,
                },
                ids: Array.from(new Set([
                    ...state.ids,
                    ...(action.payload.episodes.ids || []),
                ])),
            }
        })
    builder
      .addCase(fetchEpisodes.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchEpisodes.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const episodes = action.payload
        // Normalize and add characters to the store
        episodes.forEach(episode => {
          if (!state.episodes[episode.id]) {
            state.episodes[episode.id] = episode
            state.ids.push(episode.id)
          }
        })
      })
      .addCase(fetchEpisodes.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default episodesSlice.reducer
