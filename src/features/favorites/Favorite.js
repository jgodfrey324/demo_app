import { useSelector } from 'react-redux'

export default function Favorite({ fav }) {
    const characters = useSelector(state => state.characters.characters)
    const favoritedCharacter = characters[fav]

    if (!favoritedCharacter) return;

    return (
        <div className="p-4 border rounded bg-yellow-100 shadow cursor-pointer">
              <img src={favoritedCharacter.image} alt={favoritedCharacter.name} className="w-full rounded" />
              <p className="mt-2 font-semibold">{favoritedCharacter.name}</p>
        </div>
    )
}