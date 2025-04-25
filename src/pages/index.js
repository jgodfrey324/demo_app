import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-900 via-black to-green-800 text-white font-mono">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 neon-text">
        🌀 Rick and Morty Explorer 🛸
      </h1>

      <div className="space-y-6 space-x-6 mt-4">
        <Link 
        href="/characters"
        className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded shadow-lg transition-transform transform hover:scale-105 glow-border">
          Go to Characters
        </Link>

        <Link href="/episodes" className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded shadow-lg transition-transform transform hover:scale-105 glow-border">
          Go to Episodes
        </Link>
      </div>

      <style jsx>{`
        .neon-text {
          text-shadow: 0 0 5px #00ff99, 0 0 10px #00ff99, 0 0 20px #00ff99;
        }

        .glow-border {
          box-shadow: 0 0 10px rgba(0, 255, 153, 0.6),
                      0 0 20px rgba(0, 255, 153, 0.4),
                      0 0 30px rgba(0, 255, 153, 0.2);
        }
      `}</style>
    </main>
  );
}
