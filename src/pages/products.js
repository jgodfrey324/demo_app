import { useSelector } from 'react-redux'
import Link from 'next/link';
import { fetchProducts } from '@/features/products/productsSlice'
import { wrapper } from '../store/configureStore'
import Product from '@/features/products/Product'

export default function ProductsPage() {
  const { byId, products } = useSelector(state => state.products)

  return (
    <main className="bg-gray-100 px-4 pb-24">
        <Link href="/" className="flex items-center justify-center py-4">
            <button className="px-4 py-2 bg-black text-white rounded">Go to Counter</button>
        </Link>
        <section className="flex flex-col items-center pt-24">
            <h1 className="text-3xl font-bold mb-4 text-indigo-900">Products:</h1>
            <section className="flex flex-wrap gap-4 justify-center pt-4">
                {Object.values(products).map(product => {
                    return <Product key={product.id} product={product}/>
                })}
            </section>
        </section>
    </main>
  )
}

// SSR with Redux
export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
    await store.dispatch(fetchProducts())
    return { props: {} }
})
