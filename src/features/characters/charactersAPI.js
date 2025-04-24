import { createAsyncThunk } from '@reduxjs/toolkit'

// Thunk to fetch all characters (for the homepage)
export const fetchAllCharacters = createAsyncThunk(
  'characters/fetchAllCharacters',
  async (page = 1) => {
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
    const data = await response.json()
    return data
  }
)

// Thunk to fetch a single character details (for the character detail page)
export const fetchCharacterDetails = createAsyncThunk(
  'characters/fetchCharacterDetails',
  async (characterId) => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
    const data = await response.json()
    return data
  }
)