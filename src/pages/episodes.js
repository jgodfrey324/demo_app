import Episode from '@/features/episodes/Episode'
import { wrapper } from '../store'
import { fetchEpisodes } from '@/features/episodes/episodesSlice'
import { useSelector } from 'react-redux'
import Favorite from '@/features/favorites/Favorite'

export default function EpisodesPage() {
  const { episodes, status, error } = useSelector(state => state.episodes)
  const favorites = useSelector(state => state.favorites.favorites)

  if (status === 'loading') {
    return <div>Loading episodes...</div>
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Episodes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {episodes.map(ep => (
          <Episode ep={ep} key={ep.id} />
        ))}
      </div>

      {/* Display Favorites */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Your Favorites</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
          {favorites.map(fav => (
            <Favorite key={fav} fav={fav} />
          ))}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
  await store.dispatch(fetchEpisodes())  // Dispatch the thunk to fetch episodes
  return { props: {} }
})
