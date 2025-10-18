import Hero from '../components/Hero'
import ProductList from '../components/ProductList'

const Homepage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string; sort: string }>
}) => {
  const { category, sort } = await searchParams
  return (
    <div className=''>
      <Hero />
      <ProductList
        category={category}
        sort={sort}
        params='Home'
      />
    </div>
  )
}

export default Homepage
