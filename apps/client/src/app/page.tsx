import Hero from '../components/Hero'
import ProductList from '../components/ProductList'

const Homepage = async ({
  searchParams,
}: {
  searchParams: Promise<{ cat: string }>
}) => {
  const { cat } = await searchParams
  return (
    <div className=''>
      <Hero />
      <ProductList
        cat={cat}
        params='Home'
      />
    </div>
  )
}

export default Homepage
