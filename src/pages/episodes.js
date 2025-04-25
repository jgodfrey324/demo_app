import Episode from '@/features/episodes/Episode'
import { wrapper } from '../store/configureStore'
import { fetchEpisodes } from '@/features/episodes/episodesSlice'
import { useSelector } from 'react-redux'
import Favorite from '@/features/favorites/Favorite'
import HomeButton from '@/components/HomeButton'

export default function EpisodesPage() {
  const { episodes, ids, status, error } = useSelector(state => state.episodes)
  const favorites = useSelector(state => state.favorites.ids)

  if (status === 'loading') {
    return <div>Loading episodes...</div>
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>
  }

  return (
    <div className="min-h-screen bg-[#f3f0e0] text-[#2f2f2f] font-serif p-6">
      <HomeButton />
      <h1 className="text-4xl md:text-5xl font-bold mt-6 mb-10 text-center retro-title">
        📺 Classic Rick & Morty Episodes
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ids.map(id => (
          <Episode ep={episodes[id]} key={id} />
        ))}
      </div>

      <style jsx>{`
        .retro-title {
          text-shadow: 2px 2px #c1b07a;
          letter-spacing: 0.05em;
          font-family: 'Georgia', serif;
        }
      `}</style>
    </div>
  )
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
    await store.dispatch(fetchEpisodes());
  
    return {
      props: {},
      revalidate: 1200, // Revalidate every 20 minutes
    };
  });
