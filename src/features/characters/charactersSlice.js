import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { fetchAllCharacters, fetchCharacterDetails } from './charactersAPI'

const charactersSlice = createSlice({
  name: 'characters',
  initialState: {
    characters: {},  // Will hold character data by ID
    characterDetails: {},
    ids: [],        // Will hold character IDs for order
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // HYDRATE must come first
    builder.addCase(HYDRATE, (state, action) => {
        // Merge server and client state
        return {
          ...state,
          ...action.payload.characters,
          characters: {
            ...state.characters,
            ...action.payload.characters.characters,
          },
          characterDetails: {
            ...state.characterDetails,
            ...action.payload.characters.characterDetails,
          },
          ids: Array.from(new Set([
            ...state.ids,
            ...(action.payload.characters.ids || []),
          ])),
        }
      })

    // Fetching all characters
    builder
      .addCase(fetchAllCharacters.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAllCharacters.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const characters = action.payload.results
        // Normalize and add characters to the store
        characters.forEach(character => {
          if (!state.characters[character.id]) {
            state.characters[character.id] = character
            state.ids.push(character.id)
          }
        })
      })
      .addCase(fetchAllCharacters.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

    // Fetching a single character's details
    builder
      .addCase(fetchCharacterDetails.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchCharacterDetails.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const character = action.payload
        // Normalize and add the character to the store
        if (!state.characterDetails[character.id]) {
          state.characterDetails[character.id] = character
        }
      })
      .addCase(fetchCharacterDetails.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default charactersSlice.reducer



