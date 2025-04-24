import { createAsyncThunk } from '@reduxjs/toolkit'

// Thunk to add a character to favorites
export const addFavoriteThunk = createAsyncThunk(
  'favorites/addFavorite',
  async (character) => {
    // Simulating async behavior (e.g., save to localStorage or remote storage)
    // In this case, we're just passing the character directly
    return character
  }
)

// Thunk to remove a character from favorites
export const removeFavoriteThunk = createAsyncThunk(
  'favorites/removeFavorite',
  async (characterId) => {
    // Simulating async behavior (e.g., remove from localStorage or remote storage)
    return characterId
  }
)
