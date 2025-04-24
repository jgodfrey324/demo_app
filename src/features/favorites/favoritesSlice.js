import { createSlice } from '@reduxjs/toolkit'
import { addFavoriteThunk, removeFavoriteThunk } from './favoritesAPI'

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
      list: [],
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
          if (!state.list.some(char => char.id === action.payload.id)) {
            state.list.push(action.payload)
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
          state.list = state.list.filter(char => char.id !== action.payload)
        })
        .addCase(removeFavoriteThunk.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        })
    },
  })
  
  export default favoritesSlice.reducer