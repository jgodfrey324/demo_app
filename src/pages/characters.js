// Add this at the top of the file to make it a Client Component
"use client";

import Character from '@/features/characters/Character'
import { wrapper } from '../store/configureStore'
import { fetchAllCharacters } from '@/features/characters/charactersAPI'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import HomeButton from '@/components/HomeButton'

export default function EpisodesPage() {
  const dispatch = useDispatch()
  const { characters, ids, status, error } = useSelector(state => state.characters)

  // Check if data is already in store (on the client side)
  useEffect(() => {
    if (ids.length === 0) {
      // Only dispatch fetch if characters are not already in the store
      console.log('Fetching characters client-side...')
      dispatch(fetchAllCharacters())
    }
  }, [dispatch, ids.length])

  if (status === 'loading') {
    return <div>Loading characters...</div>
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-green-800 text-white p-6 font-mono">
      <HomeButton />
      <h1 className="text-4xl md:text-5xl font-bold mt-6 mb-8 neon-text text-center">
        🧬 Rick and Morty Characters
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {ids.map(id => (
          <Character key={id} char={characters[id]} />
        ))}
      </div>

      <style jsx>{`
        .neon-text {
          text-shadow: 0 0 5px #00ff99, 0 0 10px #00ff99, 0 0 20px #00ff99;
        }
      `}</style>
    </div>
  )
}
