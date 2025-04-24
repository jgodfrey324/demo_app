export default function Character({ char }) {

    return (
        <Link href={`/character/${char.id}`}>
            <div className="p-4 border rounded shadow hover:bg-gray-100 cursor-pointer">
                <img src={char.image} alt={char.name} className="w-full rounded" />
                <p className="mt-2 font-semibold">{char.name}</p>
            </div>
        </Link>
    )
}