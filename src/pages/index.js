import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="bg-gray-100">
      <Link href="/characters"  className="flex items-center justify-center pt-4">
        <button className="px-4 py-2 bg-black text-white rounded">Go to Characters</button>
      </Link>
      <Link href="/episodes"  className="flex items-center justify-center pt-4">
        <button className="px-4 py-2 bg-black text-white rounded">Go to Episodes</button>
      </Link>
    </main>
  )
}
