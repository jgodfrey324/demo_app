import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link';
import Counter from '@/features/counters/Counter'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="bg-gray-100">
      <Link href="/products"  className="flex items-center justify-center pt-4">
        <button className="px-4 py-2 bg-black text-white rounded">Go to Products</button>
      </Link>
      <Counter />
    </main>
  )
}
