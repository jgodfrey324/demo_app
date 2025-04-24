export default function Episode({ ep }) {

    return (
        <div className="p-4 border rounded shadow bg-white">
            <h2 className="text-xl font-semibold">{ep.name}</h2>
            <p className="text-gray-600">Air Date: {ep.air_date}</p>
            <p className="text-gray-600">Episode: {ep.episode}</p>
        </div>
    )
}