import Link from 'next/link';

export default function Character({ char }) {

    return (
        <Link 
        href={`/character/${char.id}`}
        className="block p-4 bg-black bg-opacity-50 rounded-lg shadow-lg transform hover:scale-105 transition-transform hover:bg-opacity-70 border border-green-500 hover:border-green-300">
          <img
              src={char.image}
              alt={char.name}
              className="w-full h-auto rounded mb-2 shadow-md"
            />
            <p className="text-lg font-semibold text-green-300 text-center glow-text">
              {char.name}
            </p>
    
            <style jsx>{`
              .glow-text {
                text-shadow: 0 0 5px #00ff99, 0 0 10px #00ff99;
              }
            `}</style>
        </Link>
      )
}