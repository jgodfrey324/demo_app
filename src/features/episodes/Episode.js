export default function Episode({ ep }) {

    return (
        <div className="p-6 bg-white border-2 border-[#c1b07a] rounded-md shadow-md hover:shadow-lg transition-all duration-200">
          <h2 className="text-2xl font-bold mb-2 text-[#3d3d3d] tracking-wide">
            {ep.name}
          </h2>
          <p className="text-[#555] mb-1">
            <span className="font-semibold">Air Date:</span> {ep.air_date}
          </p>
          <p className="text-[#555]">
            <span className="font-semibold">Episode:</span> {ep.episode}
          </p>
        </div>
      )
}