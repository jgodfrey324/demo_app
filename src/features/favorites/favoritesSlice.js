import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
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
        // HYDRATE must come first
        builder
            .addCase(HYDRATE, (state, action) => {
                return {
                    ...state,
                    ids: Array.from(new Set([
                        ...state.ids,
                        ...(action.payload.ids || []),
                    ])),
                }
            })
            
        builder
            .addCase(addFavoriteThunk.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(addFavoriteThunk.fulfilled, (state, action) => {
                state.status = 'succeeded'
                if (!state.ids.includes(action.payload)) {
                    state.ids.push(action.payload)
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
                state.ids = state.ids.filter(id => id !== action.payload)
            })
            .addCase(removeFavoriteThunk.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
        },
    })
  
  export default favoritesSlice.reducer