import ProductList from '../../components/ProductList'
import React from 'react'

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ cat: string }>
}) => {
  const { cat } = await searchParams
  return (
    <div>
      <ProductList
        cat={cat}
        params='Products'
      />
    </div>
  )
}

export default page
