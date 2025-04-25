import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
import { wrapper } from '../../store/configureStore'
import Link from 'next/link';
import { fetchCharacterDetails } from '@/features/characters/charactersAPI'
import { addFavoriteThunk, removeFavoriteThunk } from '@/features/favorites/favoritesAPI'

export default function CharacterDetail() {
    const router = useRouter();
    const dispatch = useDispatch();

    const id = router.query.id

    const { characterDetails, status, error } = useSelector(state => state.characters)
    const favorites = useSelector(state => state.favorites.ids)
    const [heart, setHeart] = useState(favorites.includes(id))

    useEffect(() => {
        if (id) {
            setHeart(favorites.includes(id));
        }
    }, [id, favorites, heart]);


    if (status === "loading") return <div>Loading...</div>
    if (status === "error") return <div>Error: {error}</div>
    if (!characterDetails) return;

    const handleToggleFavorite = () => {
        if (favorites.includes(id)) {
          dispatch(removeFavoriteThunk(id))
        } else {
          dispatch(addFavoriteThunk(id))
        }
      }
    const character = characterDetails[id]

    return (
        <div className="min-h-screen bg-[#f8f1e5] text-[#2e2e2e] font-serif p-8">
          <div className="max-w-xl mx-auto border-4 border-[#d3b88c] rounded-md shadow-lg p-6 bg-[#fffaf3] relative">
            <h1 className="text-3xl font-bold mb-4 border-b-2 border-[#d3b88c] pb-2 uppercase tracking-wider file-title">
              {character.name}
            </h1>
    
            <img
              src={character.image}
              alt={character.name}
              className="my-4 w-48 rounded shadow-md border border-[#bfa178]"
            />
    
            <div className="space-y-2 mb-6">
              <p><span className="font-bold">Status:</span> {character.status}</p>
              <p><span className="font-bold">Species:</span> {character.species}</p>
              <p><span className="font-bold">Gender:</span> {character.gender}</p>
            </div>
    
            <button
              onClick={handleToggleFavorite}
              className={`px-4 py-2 text-sm font-semibold tracking-wide uppercase rounded shadow-md transition-colors duration-200 ${
                heart
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
              }`}
            >
              {heart ? 'Remove Favorite' : 'Add to Favorites'}
            </button>
    
            <div className="mt-8">
              <Link 
              href="/characters"
              className="inline-block mt-4 px-4 py-2 bg-[#c5aa7d] hover:bg-[#b49568] text-white rounded uppercase text-sm tracking-wider shadow-sm">
                ⬅ Go back to Characters
              </Link>
            </div>
          </div>
    
          <style jsx>{`
            .file-title {
              font-family: 'Courier New', Courier, monospace;
              text-shadow: 1px 1px #c4b89e;
            }
          `}</style>
        </div>
      )
}

export const getStaticPaths = async (context) => {
    // You’ll need to fetch all character IDs here
    const res = await fetch(`https://rickandmortyapi.com/api/character?page=1`);
    const data = await res.json();

    const topCharacters = data.results.slice(0, 20); // only build 20

    const paths = topCharacters.map((char) => ({
        params: { id: char.id.toString() },
    }));

    return {
    paths,
    fallback: 'blocking', // or 'true' or 'false' depending on your strategy
    };
  };

export const getStaticProps = wrapper.getStaticProps((store) => async (context) => {
    const { id } = context.params
    await store.dispatch(fetchCharacterDetails(id));
  
    return {
      props: {},
      revalidate: 1200, // Revalidate every 20 minutes
    };
  });
