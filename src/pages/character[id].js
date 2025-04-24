import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { wrapper } from '../../store'
import { fetchCharacterDetails } from '@/features/characters/charactersAPI'
import { addFavoriteThunk, removeFavoriteThunk } from '@/features/favorites/favoritesAPI'

export default function CharacterDetail() {
    const router = useRouter();
    const dispatch = useDispatch();

    const id = router.query
    const { characterDetails, status, error } = useSelector(state => state.characters)
    const favorites = useSelector(state => state.favorites.ids)

    if (status === "loading") return <div>Loading...</div>
    if (status === "error") return <div>Error: {error}</div>
    if (!characterDetails) return;

    const handleToggleFavorite = () => {
        if (isFavorite) {
          dispatch(removeFavoriteThunk(id))
        } else {
          dispatch(addFavoriteThunk(id))
        }
      }

    const character = characterDetails[id]
    const isFavorite = favorites.includes(id)

    return (
        <div className="p-4">
            <div className="p-4">
                <h1 className="text-3xl font-bold">{character.name}</h1>
                <img src={character.image} alt={character.name} className="my-4 w-48 rounded" />
                <p>Status: {character.status}</p>
                <p>Species: {character.species}</p>
                <p>Gender: {character.gender}</p>
            </div>

            <button
                onClick={handleToggleFavorite}
                className={`px-4 py-2 rounded ${isFavorite ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
            >
                {isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
            </button>
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    const { id } = context.params
    await store.dispatch(fetchCharacterDetails(id))  // Dispatch the thunk to fetch episodes
    return { props: {} }
})
