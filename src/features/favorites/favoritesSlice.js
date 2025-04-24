import { createSlice } from '@reduxjs/toolkit'
import { addFavoriteThunk, removeFavoriteThunk } from './favoritesAPI'

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
      ids: [],
      status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(addFavoriteThunk.pending, (state) => {
          state.status = 'loading'
        })
        .addCase(addFavoriteThunk.fulfilled, (state, action) => {
          state.status = 'succeeded'
          const char = action.payload
          if (!state.includes(char.id)) {
            state.ids = [...state.ids, char.id]
          }
        })
        .addCase(addFavoriteThunk.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        })
        .addCase(removeFavoriteThunk.pending, (state) => {
          state.status = 'loading'
        })
        .addCase(removeFavoriteThunk.fulfilled, (state, action) => {
          state.status = 'succeeded'
          const charId = action.payload
          state.ids = [...state.ids.filter(id => id !== charId)]
        })
        .addCase(removeFavoriteThunk.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        })
    },
  })
  
  export default favoritesSlice.reducer