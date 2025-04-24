import Character from '@/features/characters/Character'
import { wrapper } from '../store'
import { fetchAllCharacters } from '@/features/characters/charactersAPI'
import { useSelector } from 'react-redux'

export default function EpisodesPage() {
  const { characters, status, error } = useSelector(state => state.characters)

  if (status === 'loading') {
    return <div>Loading characters...</div>
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>
  }

  return (
    <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">Rick and Morty Characters</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {characters.map(char => (
                <Character key={char.id} char={char} />
            ))}
        </div>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
  await store.dispatch(fetchAllCharacters())  // Dispatch the thunk to fetch episodes
  return { props: {} }
})
